'use client'

import { FormEvent, useRef, useState } from 'react'
import { Bot, Send, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

type ChatMessage = {
  role: 'user' | 'assistant'
  content: string
}

const examples = ['9-р давхарт юу байдаг вэ?', 'Гоо сайхны үйлчилгээ хаана байдаг вэ?', 'TOEFL хаана байдаг вэ?']

export function AIChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: 'Сайн байна уу. Би UBH Center-ийн ухаалаг туслах. Давхар, компани, үйлчилгээ, байршлын талаар асуугаарай.' }
  ])
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  async function ask(question: string) {
    if (!question.trim() || loading) return

    const nextMessages: ChatMessage[] = [...messages, { role: 'user', content: question }]
    setMessages([...nextMessages, { role: 'assistant', content: '' }])
    setLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages })
      })

      if (!response.ok || !response.body) {
        const details = await response.text().catch(() => '')
        throw new Error(details || 'AI хариу авах боломжгүй байна.')
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        setMessages((current) => {
          const copy = [...current]
          copy[copy.length - 1] = { role: 'assistant', content: copy[copy.length - 1].content + chunk }
          return copy
        })
      }
    } catch (error) {
      setMessages((current) => {
        const copy = [...current]
        copy[copy.length - 1] = { role: 'assistant', content: error instanceof Error ? `Уучлаарай, AI туслахын алдаа: ${error.message}` : 'Уучлаарай, AI туслах түр хугацаанд хариулах боломжгүй байна.' }
        return copy
      })
    } finally {
      setLoading(false)
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const value = inputRef.current?.value ?? ''
    inputRef.current!.value = ''
    ask(value)
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#1a3a5c] text-white shadow-[0_10px_30px_rgba(26,58,92,0.35)] transition hover:-translate-y-1 hover:bg-[#102b46]"
        aria-label="AI туслах нээх"
      >
        <Bot className="h-6 w-6" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            className="fixed bottom-24 right-5 z-50 flex h-[560px] w-[calc(100vw-2.5rem)] max-w-md flex-col overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white shadow-[0_20px_50px_rgba(15,23,42,0.18)]"
          >
            <div className="flex items-center justify-between border-b border-[#e2e8f0] p-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#eef4ff] text-[#2563eb]">
                  <Bot className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="font-semibold text-[#0f172a]">UBH AI туслах</h2>
                  <p className="text-xs text-[#64748b]">Давхар, компани, үйлчилгээний асуулт</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="rounded-lg p-2 text-[#64748b] hover:bg-[#f1f5f9]" aria-label="AI туслах хаах">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto bg-[#f8f9fc] p-4">
              {messages.map((message, index) => (
                <div key={index} className={message.role === 'user' ? 'ml-auto max-w-[82%]' : 'mr-auto max-w-[88%]'}>
                  <div className={message.role === 'user' ? 'rounded-2xl bg-[#1a3a5c] px-4 py-3 text-sm leading-6 text-white' : 'rounded-2xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm leading-6 text-[#334155]'}>
                    {message.content || '...'}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-[#e2e8f0] p-4">
              <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
                {examples.map((example) => (
                  <button key={example} onClick={() => ask(example)} className="shrink-0 rounded-full bg-[#eef4ff] px-3 py-1.5 text-xs font-medium text-[#2563eb] hover:bg-[#dbeafe]">
                    {example}
                  </button>
                ))}
              </div>
              <form onSubmit={submit} className="flex gap-2">
                <input ref={inputRef} className="input min-w-0 flex-1" placeholder="Асуултаа бичнэ үү..." />
                <button disabled={loading} className="btn-primary px-4" aria-label="Илгээх">
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
