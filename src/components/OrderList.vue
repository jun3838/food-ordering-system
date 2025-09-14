<script lang="ts" setup>
import { computed } from 'vue';
import { Order } from '@/types/order';

const props = defineProps<{
  orders: Order[];
  title: string;
}>();
</script>

<template>
  <div class="bg-white p-6 rounded-2xl shadow-lg flex flex-col h-[400px]">
    <h2 class="text-xl font-bold text-gray-700 mb-4 border-b pb-2">{{ title }}</h2>

    <div v-if="orders.length > 0" class="space-y-2 flex-1 overflow-auto">
      <div v-for="order in orders" :key="order.id"
        class="flex items-center p-3 rounded-lg"
        :class="order.type === 'vip' ? 'bg-yellow-100 border-l-4 border-yellow-500' : 'bg-gray-100'"
      >
        <span class="text-2xl mr-3">{{ order.type === 'vip' ? '⭐' : '🍔' }}</span>
        <span class="font-semibold text-gray-800">Order #{{ order.id }}</span>
        <span class="ml-auto px-2 py-1 text-xs font-bold text-white rounded-full uppercase"
          :class="order.type === 'vip' ? 'bg-yellow-500' : 'bg-gray-500'"
        >
          {{ order.type }}
        </span>
      </div>
    </div>

    <div v-else>
      <p class="text-gray-500 text-center py-4">No orders yet.</p>
    </div>
  </div>
</template>