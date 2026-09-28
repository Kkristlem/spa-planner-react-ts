import { useQuery } from '@tanstack/react-query'
import { api } from '../api/client'
import type { ProductCard } from '../types'

function riskLevel(product: ProductCard): 'error' | 'warning' | 'ok' {
  if (product.alerts.some((a) => a.level === 'error')) return 'error'
  if (product.alerts.some((a) => a.level === 'warning')) return 'warning'
  return 'ok'
}

export function Catalog() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['products'],
    queryFn: api.products
  })

  if (isLoading) return <p>Загружаем каталог…</p>
  if (isError) return <p role="alert">Не удалось загрузить каталог: {(error as Error).message}</p>
  if (!data || data.length === 0) return <p>Каталог пуст.</p>

  return (
    <table className="catalog-table">
      <thead>
        <tr>
          <th>Товар</th>
          <th>Категория</th>
          <th>Остаток</th>
          <th>Запас, дней</th>
          <th>Риск</th>
        </tr>
      </thead>
      <tbody>
        {data.map((p) => (
          <tr key={p.id} data-risk={riskLevel(p)}>
            <td>{p.name}</td>
            <td>{p.category}</td>
            <td>
              {p.total_stock} {p.unit}
            </td>
            <td>{p.days_of_stock ?? '—'}</td>
            <td>
              <span className={`badge badge-${riskLevel(p)}`}>
                {p.alerts.length > 0 ? p.alerts[0].message : 'В норме'}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
