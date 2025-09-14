<script lang="ts" setup>
import { useOrderStore } from '@/stores/orderStore';

const store = useOrderStore();
</script>

<template>
  <div class="bg-gray-50 p-4 rounded-lg">
    <div class="flex justify-between items-center mb-2">
      <span class="font-semibold text-gray-700">Manage Bots</span>
      <span class="text-sm text-gray-700">Active: <span class="font-bold text-xl">{{ store.bots.length }}</span></span>
    </div>
    <div class="flex gap-2">
      <button @click="store.addBot" class="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold shadow-md transition-transform transform hover:scale-105">
        + Add Bot
      </button>
      <button @click="store.removeBot" :disabled="store.bots.length === 0" class="w-full py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold shadow-md transition-transform transform hover:scale-105 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:transform-none">
        - Remove Bot
      </button>
    </div>
  </div>
</template>