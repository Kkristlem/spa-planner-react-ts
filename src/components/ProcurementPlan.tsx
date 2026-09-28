import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { api } from '../api/client'

const HORIZONS = [1, 3, 6, 12]

export function ProcurementPlanView() {
  const [months, setMonths] = useState(3)
  const { data, isLoading, isError } = useQuery({
    queryKey: ['procurement-plan', months],
    queryFn: () => api.procurementPlan(months)
  })

  return (
    <section>
      <h2>План закупок</h2>
      <label>
        Горизонт:{' '}
        <select value={months} onChange={(e) => setMonths(Number(e.target.value))}>
          {HORIZONS.map((m) => (
            <option key={m} value={m}>
              {m} мес.
            </option>
          ))}
        </select>
      </label>

      {isLoading && <p>Считаем план…</p>}
      {isError && <p role="alert">Не удалось построить план закупок.</p>}

      {data && (
        <>
          <p>
            Итого: <strong>{data.total_cost_rub.toLocaleString('ru-RU')} ₽</strong> из бюджета{' '}
            {data.budget_limit_rub.toLocaleString('ru-RU')} ₽ —{' '}
            <span className={data.within_budget ? 'badge badge-ok' : 'badge badge-error'}>
              {data.within_budget ? 'в рамках бюджета' : 'превышение бюджета'}
            </span>
          </p>
          <table>
            <thead>
              <tr>
                <th>Товар</th>
                <th>Рекомендуемый объём</th>
                <th>Стоимость</th>
                <th>Дата заказа</th>
                <th>Поставщик</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((item) => (
                <tr key={item.product_id} title={item.explanation}>
                  <td>{item.product_name}</td>
                  <td>
                    {item.recommended_qty} {item.unit}
                  </td>
                  <td>{item.cost_rub.toLocaleString('ru-RU')} ₽</td>
                  <td>{item.order_date}</td>
                  <td>{item.supplier}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </section>
  )
}
