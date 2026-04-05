<script setup lang="ts">
import RealtimeIndicatorsPanel from '@/components/RealtimeIndicatorsPanel.vue'
import HistoryChart from '@/components/HistoryChart.vue' 

</script>

<template>
  <section class="flex flex-col gap-4">
    <header class="flex flex-col gap-2">
      <h2 class="m-0 text-2xl font-semibold text-[var(--p-text-color)]">
        Indicadores em tempo real
      </h2>
    </header>

    <RealtimeIndicatorsPanel />
  </section>

  <section class="flex flex-col gap-4 mt-15">
    <header class="flex flex-col gap-2">
      <h2 class="m-0 text-2xl font-semibold text-[var(--p-text-color)]">Dados históricos</h2>
    </header>

  <HistoryChart />
  
  </section>
</template>
