<script setup lang="ts">
defineProps<{
  value: number | string
  label: string
  color: string
  unit?: string
}>()
</script>

<template>
  <article
    class="flex min-h-[120px] flex-col justify-between overflow-hidden rounded-[14px] border border-slate-200 bg-white/90 shadow-[0_12px_32px_-24px_rgba(15,23,42,0.32)]"
  >
    <div class="flex flex-col gap-[0.45rem] px-5 pt-5">
      <span class="text-[2.1rem] font-bold leading-none text-slate-900">
        {{ value }}
        <span v-if="unit" class="ml-1 text-[1.1rem] font-medium">
          {{ unit }}
        </span>
      </span>

      <span class="text-[0.95rem] text-slate-600">
        {{ label }}
      </span>
    </div>

    <div class="h-[6px] w-full" :style="{ backgroundColor: color }" />
  </article>
</template>
