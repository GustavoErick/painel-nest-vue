<script setup lang="ts">
import { computed, ref, onMounted, watch, onBeforeUnmount } from 'vue'
import {
  Chart,
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Filler,
  Tooltip,
} from 'chart.js'

Chart.register(
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Filler,
  Tooltip,
)

interface HistoryRecord {
  id: string
  indicatorId: string
  value: number
  referenceDate: string
  createdAt: string
  metadata: Record<string, unknown>
}

const INDICATOR_CONFIG: Record<string, { label: string; color: string }> = {
  finalized: { label: 'Finalizadas', color: '#22c55e' },
  inProgress: { label: 'Em andamento', color: '#3b82f6' },
  inAnesthesia: { label: 'Em anestesia', color: '#f59e0b' },
  averageDelayMinutes: { label: 'Atraso médio (min)', color: '#ef4444' },
}

const indicators = Object.keys(INDICATOR_CONFIG)
const selectedIndicator = ref<string>('finalized')

const historyData = ref<HistoryRecord[]>([])
const isLoading = ref(false)
const error = ref<string | null>(null)

async function fetchHistory() {
  isLoading.value = true
  error.value = null
  try {
    const url = new URL(`${import.meta.env.VITE_API_URL}/history`)
    const response = await fetch(url.toString())
    if (!response.ok) throw new Error('Falha ao buscar o histórico')
    historyData.value = await response.json()
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Erro ao carregar os dados'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => fetchHistory())

const filtered = computed(() =>
  historyData.value.filter((r) => r.indicatorId === selectedIndicator.value),
)

// Chart.js canvas
const canvasRef = ref<HTMLCanvasElement | null>(null)
let chartInstance: Chart | null = null

function buildChart() {
  if (!canvasRef.value || filtered.value.length === 0) return

  if (chartInstance) {
    chartInstance.destroy()
    chartInstance = null
  }

  const color = INDICATOR_CONFIG[selectedIndicator.value]?.color ?? '#3b82f6'

  chartInstance = new Chart(canvasRef.value, {
    type: 'line',
    data: {
      labels: filtered.value.map((r) =>
        new Date(r.referenceDate).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
        }),
      ),
      datasets: [
        {
          label: INDICATOR_CONFIG[selectedIndicator.value]?.label ?? selectedIndicator.value,
          data: filtered.value.map((r) => Number(r.value)),
          borderColor: color,
          backgroundColor: color + '1a',
          borderWidth: 2.5,
          pointRadius: 4,
          pointBackgroundColor: color,
          tension: 0.4,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#0f172a',
          titleColor: '#94a3b8',
          bodyColor: '#f1f5f9',
          padding: 10,
          cornerRadius: 8,
        },
      },
      scales: {
        x: {
          grid: { color: '#f1f5f9' },
          ticks: { color: '#94a3b8', font: { size: 12 } },
        },
        y: {
          grid: { color: '#f1f5f9' },
          ticks: { color: '#94a3b8', font: { size: 12 } },
          beginAtZero: true,
        },
      },
    },
  })
}

watch([filtered, canvasRef], () => {
  buildChart()
})

onBeforeUnmount(() => {
  chartInstance?.destroy()
})
</script>

<template>
  <article
    class="relative flex flex-col gap-5 overflow-hidden rounded-[14px] border border-slate-200 bg-white/90 p-6 shadow-[0_12px_32px_-24px_rgba(15,23,42,0.32)]"
  >
    <!-- Tabs de seleção -->
    <div class="flex flex-wrap gap-2">
      <button
        v-for="id in indicators"
        :key="id"
        class="rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-200"
        :style="
          selectedIndicator === id
            ? {
                backgroundColor: INDICATOR_CONFIG[id].color,
                borderColor: INDICATOR_CONFIG[id].color,
                color: '#fff',
              }
            : {
                backgroundColor: 'transparent',
                borderColor: '#e2e8f0',
                color: '#64748b',
              }
        "
        @click="selectedIndicator = id"
      >
        {{ INDICATOR_CONFIG[id].label }}
      </button>
    </div>

    <!-- Loading -->
    <div v-if="isLoading" class="flex h-[300px] items-center justify-center">
      <span class="text-sm text-slate-400">Carregando dados...</span>
    </div>

    <!-- Erro -->
    <div v-else-if="error" class="flex h-[300px] items-center justify-center">
      <span class="text-sm text-red-400">{{ error }}</span>
    </div>

    <!-- Sem dados -->
    <div v-else-if="filtered.length === 0" class="flex h-[300px] items-center justify-center">
      <span class="text-sm text-slate-400">Nenhum dado histórico disponível.</span>
    </div>

    <!-- Gráfico -->
    <div v-else class="h-[300px]">
      <canvas ref="canvasRef" class="h-full w-full" />
    </div>

    <!-- Barra colorida no rodapé -->
    <div
      class="absolute bottom-0 left-0 h-[5px] w-full transition-colors duration-300"
      :style="{ backgroundColor: INDICATOR_CONFIG[selectedIndicator].color }"
    />
  </article>
</template>
