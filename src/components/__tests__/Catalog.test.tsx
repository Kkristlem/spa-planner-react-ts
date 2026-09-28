import { render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import { Catalog } from '../Catalog'
import { api } from '../../api/client'

vi.mock('../../api/client', () => ({
  api: { products: vi.fn() }
}))

function renderWithClient(ui: React.ReactNode) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return render(<QueryClientProvider client={client}>{ui}</QueryClientProvider>)
}

describe('Catalog', () => {
  beforeEach(() => vi.resetAllMocks())

  it('показывает товары и метку риска для алертов', async () => {
    ;(api.products as ReturnType<typeof vi.fn>).mockResolvedValue([
      {
        id: 'P001',
        name: 'Массажное масло',
        sku: 'SKU-1',
        category: 'Расходники',
        unit: 'фл.',
        total_stock: 12,
        safety_stock: 20,
        min_stock: 10,
        avg_monthly_consumption: 30,
        days_of_stock: 12,
        alerts: [{ level: 'error', code: 'deficit', product_id: 'P001', message: 'Дефицит' }]
      }
    ])

    renderWithClient(<Catalog />)

    await waitFor(() => expect(screen.getByText('Массажное масло')).toBeInTheDocument())
    expect(screen.getByText('Дефицит')).toBeInTheDocument()
  })

  it('показывает сообщение об ошибке при сбое запроса', async () => {
    ;(api.products as ReturnType<typeof vi.fn>).mockRejectedValue(new Error('API 500'))

    renderWithClient(<Catalog />)

    await waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument())
  })
})
