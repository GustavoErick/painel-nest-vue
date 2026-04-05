import { ref, onMounted } from 'vue'

export interface HistoryRecord {
  id: string
  indicatorId: string
  value: number
  referenceDate: string
  createdAt: string
  metadata: any
}

export function useHistory(indicatorId?: string) {
  const historyData = ref<HistoryRecord[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const fetchHistory = async () => {
    isLoading.value = true
    error.value = null
    try {
      const url = new URL(`${import.meta.env.VITE_API_URL}/history`)
      if (indicatorId) {
        url.searchParams.append('indicatorId', indicatorId)
      }
      
      const response = await fetch(url.toString())
      if (!response.ok) {
        throw new Error('Falha ao buscar o histórico')
      }
      
      const data = await response.json()
      historyData.value = data
    } catch (err: any) {
      error.value = err.message || 'Erro ao carregar os dados de histórico'
    } finally {
      isLoading.value = false
    }
  }

  onMounted(() => {
    fetchHistory()
  })

  return {
    historyData,
    isLoading,
    error,
    fetchHistory
  }
}
