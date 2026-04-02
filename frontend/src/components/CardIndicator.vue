<script setup lang="ts">
defineProps<{
  value: number | string | Date
  label: string
  color: string
  unit?: string
}>()
</script>

<template>
  <div class="card">
    <div class="card-content">
      <span class="card-value"
        >{{ value }}<span v-if="unit" class="card-unit">{{ unit }}</span></span
      >
      <span class="card-label">{{ label }}</span>
    </div>
    <div class="card-bar" :style="{ backgroundColor: color }" />
  </div>
</template>

<style scoped>
.card {
  background-color: var(--card-bg, #ffffff);
  border-radius: 12px;
  border: 1px solid var(--card-border, #e2e8f0);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.25rem 1.25rem 0;
  gap: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.card-value {
  font-size: 2rem;
  font-weight: 700;
  color: var(--card-text, #0f172a);
  line-height: 1;
}

.card-unit {
  font-size: 1.25rem;
  font-weight: 500;
  margin-left: 2px;
}

.card-label {
  font-size: 0.875rem;
  color: var(--card-muted, #64748b);
}

.card-bar {
  height: 5px;
  width: 100%;
  border-radius: 0 0 2px 2px;
}

@media (prefers-color-scheme: dark) {
  .card {
    --card-bg: #1e293b;
    --card-border: #334155;
    --card-text: #f1f5f9;
    --card-muted: #94a3b8;
  }
}
</style>
