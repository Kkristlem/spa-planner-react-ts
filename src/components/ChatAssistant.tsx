import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { api } from '../api/client'

export function ChatAssistant() {
  const [question, setQuestion] = useState('')
  const mutation = useMutation({ mutationFn: api.ask })

  return (
    <section>
      <h2>Чат-помощник</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (question.trim()) mutation.mutate(question)
        }}
      >
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Сколько массажного масла нужно закупить на три месяца?"
        />
        <button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? 'Считаем…' : 'Спросить'}
        </button>
      </form>

      {mutation.isError && <p role="alert">Ошибка: {(mutation.error as Error).message}</p>}

      {mutation.data && (
        <div className="chat-answer">
          <p>{mutation.data.answer_text}</p>
          {mutation.data.assumptions.length > 0 && (
            <details>
              <summary>Допущения расчёта</summary>
              <ul>
                {mutation.data.assumptions.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </details>
          )}
        </div>
      )}
    </section>
  )
}
