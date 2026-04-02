import { ref, onUnmounted } from 'vue'

export interface Indicators {
  finalized: number
  inProgress: number
  inAnesthesia: number
  averageDelayMinutes: number
  updatedAt: Date | null
}

export function useIndicators() {
  const indicators = ref<Indicators>({
    finalized: 0,
    inProgress: 0,
    inAnesthesia: 0,
    averageDelayMinutes: 0,
    updatedAt: null,
  })

  const isConnected = ref(false)
  const error = ref<string | null>(null)

  const source = new EventSource(`${import.meta.env.VITE_API_URL}/indicators/stream`)

  source.onopen = () => {
    isConnected.value = true
    error.value = null
  }

  source.onmessage = (event: MessageEvent) => {
    const data = JSON.parse(event.data as string) as Indicators
    indicators.value = data
  }

  source.onerror = () => {
    isConnected.value = false
    error.value = 'Erro ao conectar com o servidor'
  }

  onUnmounted(() => {
    source.close()
  })

  return {
    indicators,
    isConnected,
    error,
  }
}
