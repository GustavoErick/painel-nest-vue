<script setup lang="ts">
import CardIndicator from '@/components/CardIndicator.vue'
import { useIndicators } from '@/composables/useIndicators'

const { indicators, isConnected, error } = useIndicators()

type CardConfig = {
  key: 'finalized' | 'inProgress' | 'inAnesthesia' | 'averageDelayMinutes'
  label: string
  color: string
  unit?: string
}

const cards: CardConfig[] = [
  {
    key: 'finalized',
    label: 'Cirurgias finalizadas',
    color: '#22c55e',
  },
  {
    key: 'inProgress',
    label: 'Em andamento',
    color: '#6366f1',
  },
  {
    key: 'inAnesthesia',
    label: 'Em anestesia',
    color: '#f59e0b',
  },
  {
    key: 'averageDelayMinutes',
    label: 'Atraso médio',
    color: '#ef4444',
    unit: 'min',
  },
]
</script>

<template>
  <section class="flex w-full flex-col gap-6">
    <div class="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      <div class="flex items-center gap-2 whitespace-nowrap">
        <span
          class="h-2.5 w-2.5 rounded-full transition-colors duration-300"
          :class="isConnected ? 'bg-green-500' : 'bg-red-500'"
        />
        <span class="text-sm text-[var(--p-text-muted-color,#64748b)]">
          {{ isConnected ? 'Tempo real' : 'Reconectando...' }}
        </span>
      </div>

      <p v-if="indicators.updatedAt" class="m-0 text-sm text-[var(--p-text-muted-color,#64748b)]">
        Atualizado às
        {{ new Date(indicators.updatedAt).toLocaleTimeString('pt-BR') }}
      </p>
    </div>

    <p
      v-if="error"
      class="m-0 rounded-xl border border-red-200 bg-red-50 px-4 py-[0.85rem] text-[0.9rem] text-red-700"
    >
      {{ error }}
    </p>

    <section class="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-5">
      <CardIndicator
        v-for="card in cards"
        :key="card.key"
        :value="indicators[card.key as keyof typeof indicators] ?? 0"
        :label="card.label"
        :color="card.color"
        :unit="card.unit"
      />
    </section>
  </section>
</template>
