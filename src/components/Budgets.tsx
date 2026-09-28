import { useQuery } from '@tanstack/react-query'
import { api } from '../api/client'

export function BudgetsPanel() {
  const { data, isLoading } = useQuery({ queryKey: ['budgets'], queryFn: api.budgets })

  if (isLoading) return <p>Загружаем бюджеты…</p>
  if (!data) return null

  return (
    <div className="budgets-grid">
      {data.map((b) => (
        <div key={b.label} className="budget-card">
          <h3>{b.label}</h3>
          <p>{b.estimated_cost_rub.toLocaleString('ru-RU')} ₽</p>
          {b.limit_rub != null && (
            <p className={b.within_limit ? 'badge badge-ok' : 'badge badge-error'}>
              лимит {b.limit_rub.toLocaleString('ru-RU')} ₽
            </p>
          )}
        </div>
      ))}
    </div>
  )
}
