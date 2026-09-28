import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Catalog } from './components/Catalog'
import { ProcurementPlanView } from './components/ProcurementPlan'
import { AlertsPanel } from './components/Alerts'
import { BudgetsPanel } from './components/Budgets'
import { ChatAssistant } from './components/ChatAssistant'
import './App.css'

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, staleTime: 30_000 } }
})

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="app-shell">
        <header>
          <h1>Mountain &amp; Sea Spa — планирование закупок</h1>
        </header>

        <section>
          <h2>Каталог и риски</h2>
          <Catalog />
        </section>

        <ProcurementPlanView />

        <section>
          <h2>Предупреждения</h2>
          <AlertsPanel />
        </section>

        <section>
          <h2>Бюджеты</h2>
          <BudgetsPanel />
        </section>

        <ChatAssistant />
      </main>
    </QueryClientProvider>
  )
}
