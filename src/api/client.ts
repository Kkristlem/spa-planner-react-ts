import type { Alert, BudgetPeriod, ChatAnswer, ProcurementPlan, ProductCard } from '../types'

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...init
  })
  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new Error(`API ${path} вернул ${res.status}: ${body}`)
  }
  return res.json() as Promise<T>
}

export const api = {
  products: () => request<ProductCard[]>('/api/catalog/products'),
  alerts: () => request<Alert[]>('/api/planning/alerts'),
  budgets: () => request<BudgetPeriod[]>('/api/planning/budgets'),
  procurementPlan: (months: number) =>
    request<ProcurementPlan>(`/api/planning/procurement-plan?months=${months}`),
  ask: (question: string) =>
    request<ChatAnswer>('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ question })
    })
}
