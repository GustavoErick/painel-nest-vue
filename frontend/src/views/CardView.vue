<script setup lang="ts">
import CardIndicator from '@/components/CardIndicator.vue'
import { useIndicators } from '@/composables/useIndicators'

const { indicators, isConnected } = useIndicators()

const cards = [
  {
    key: 'finalized',
    label: 'Cirurgias Finalizadas',
    color: '#22c55e',
  },
  {
    key: 'inProgress',
    label: 'Em Andamento',
    color: '#6366f1',
  },
  {
    key: 'inAnesthesia',
    label: 'Em Anestesia',
    color: '#f59e0b',
  },
  {
    key: 'averageDelayMinutes',
    label: 'Atraso Médio',
    color: '#ef4444',
    unit: 'min',
  },
]
</script>

<template>
  <main class="cards">
    <header class="cards-header">
      <h1 class="cards-title">Painel Cirúrgico</h1>
      <div class="cards-status">
        <span class="status-dot" :class="{ connected: isConnected }" />
        <span class="status-label">{{ isConnected ? 'Tempo real' : 'Reconectando...' }}</span>
      </div>
    </header>

    <section class="cards-grid">
      <CardIndicator
        v-for="card in cards"
        :key="card.key"
        :value="indicators[card.key as keyof typeof indicators] ?? 0"
        :label="card.label"
        :color="card.color"
        :unit="card.unit"
      />
    </section>

    <footer class="cards-footer">
      <span v-if="indicators.updatedAt">
        Última atualização: {{ new Date(indicators.updatedAt).toLocaleTimeString('pt-BR') }}
      </span>
    </footer>
  </main>
</template>

<style scoped>
.cards {
  min-height: 100vh;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.cards-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.cards-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text, #0f172a);
}

.cards-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #ef4444;
  transition: background-color 0.3s;
}

.status-dot.connected {
  background-color: #22c55e;
}

.status-label {
  font-size: 0.875rem;
  color: var(--muted, #64748b);
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.25rem;
}

.cards-footer {
  font-size: 0.75rem;
  color: var(--muted, #64748b);
  text-align: right;
}

@media (prefers-color-scheme: dark) {
  .cards-title {
    color: #f1f5f9;
  }
}
</style>
