import { useQuery } from '@tanstack/react-query'
import { api } from '../api/client'

export function AlertsPanel() {
  const { data, isLoading } = useQuery({ queryKey: ['alerts'], queryFn: api.alerts })

  if (isLoading) return <p>Загружаем предупреждения…</p>
  if (!data || data.length === 0) return <p>Активных предупреждений нет.</p>

  return (
    <ul className="alerts-list">
      {data.map((a, i) => (
        <li key={`${a.product_id}-${a.code}-${i}`} className={`alert-${a.level}`}>
          <strong>{a.code}</strong> ({a.product_id}): {a.message}
        </li>
      ))}
    </ul>
  )
}
