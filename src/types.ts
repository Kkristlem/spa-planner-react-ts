export interface Alert {
  level: 'error' | 'warning'
  code: string
  product_id: string
  message: string
}

export interface ProductCard {
  id: string
  name: string
  sku: string
  category: string
  unit: string
  total_stock: number
  safety_stock: number
  min_stock: number
  avg_monthly_consumption: number
  days_of_stock: number | null
  alerts: Alert[]
}

export interface PurchaseRecommendation {
  product_id: string
  product_name: string
  unit: string
  current_stock: number
  incoming_qty: number
  forecast_demand: number
  expected_stock: number
  safety_stock: number
  recommended_qty: number
  supplier: string
  price_rub: number
  cost_rub: number
  order_date: string
  lead_time_days: number
  explanation: string
}

export interface ProcurementPlan {
  period_months: number
  horizon: string
  items: PurchaseRecommendation[]
  total_cost_rub: number
  budget_limit_rub: number
  within_budget: boolean
  budget_by_month: Record<string, number>
  budget_by_category: Record<string, number>
}

export interface BudgetPeriod {
  label: string
  months: number
  estimated_cost_rub: number
  limit_rub: number | null
  within_limit: boolean | null
}

export interface ChatAnswer {
  question: string
  answer_text: string
  data: Record<string, unknown> | null
  assumptions: string[]
  as_of: string
}
