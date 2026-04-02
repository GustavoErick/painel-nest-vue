<script setup lang="ts">
import DashboardView from './DashboardView.vue'
</script>

<template>
  <main
    class="mx-auto flex min-h-screen w-full max-w-[1200px] flex-col gap-8 px-4 py-6 sm:px-6 sm:py-8"
  >
    <header class="flex flex-col gap-2">
      <h1 class="m-0 text-3xl font-bold text-[var(--p-text-color)] sm:text-4xl">
        Painel Cirúrgico
      </h1>
    </header>

    <section class="sm:p-6">
      <DashboardView />
    </section>
  </main>
</template>
