<script lang="ts" setup>
import { useOrderStore } from '@/stores/orderStore';

const store = useOrderStore();
</script>

<template>
  <div class="bg-white p-6 rounded-2xl shadow-lg">
    <h2 class="text-xl font-bold text-gray-700 mb-4 border-b pb-2">Cooking Bots</h2>
    <div v-if="store.bots.length > 0" class="grid grid-cols-2 sm:grid-cols-3 gap-4">
      <div v-for="bot in store.bots" :key="bot.id"
           class="p-3 rounded-lg text-center"
           :class="bot.currentOrder ? 'bg-blue-100 border border-blue-300' : 'bg-gray-100'">

        <div class="font-bold text-lg text-gray-800">🤖 Bot #{{ bot.id }}</div>

        <div v-if="!bot.currentOrder" class="text-green-600 font-semibold mt-1">
          Idle
        </div>

        <div v-else class="mt-1">
          <div class="text-blue-600 font-semibold">
            Processing Order #{{ bot.currentOrder.id }}
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2.5 mt-2">
            <div class="bg-blue-500 h-2.5 rounded-full" :style="{ width: `${bot.progress}%` }"></div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p class="text-gray-500 text-center py-4">No active bots.</p>
    </div>
  </div>
</template>