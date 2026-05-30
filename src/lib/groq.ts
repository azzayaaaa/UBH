const GROQ_ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions'

export async function streamGroqAnswer(messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>) {
  if (!process.env.GROQ_API_KEY) {
    return new Response('Groq API түлхүүр тохируулаагүй байна.', { status: 503 })
  }

  const response = await fetch(GROQ_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: process.env.GROQ_MODEL || 'llama3-70b-8192',
      messages,
      stream: true,
      temperature: 0.3
    })
  })

  if (!response.ok || !response.body) {
    const details = await response.text().catch(() => '')
    return new Response(details || 'AI туслахаас хариу авахад алдаа гарлаа.', { status: response.status })
  }

  const encoder = new TextEncoder()
  const decoder = new TextDecoder()

  const stream = new ReadableStream({
    async start(controller) {
      const reader = response.body!.getReader()
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() ?? ''

        for (const line of lines) {
          const trimmed = line.trim()
          if (!trimmed.startsWith('data:')) continue
          const data = trimmed.replace(/^data:\s*/, '')
          if (data === '[DONE]') continue

          try {
            const parsed = JSON.parse(data)
            const content = parsed.choices?.[0]?.delta?.content
            if (content) controller.enqueue(encoder.encode(content))
          } catch {
            // Stream доторх хоосон эсвэл эвдэрсэн хэсгийг алгасана.
          }
        }
      }

      controller.close()
    }
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache'
    }
  })
}
