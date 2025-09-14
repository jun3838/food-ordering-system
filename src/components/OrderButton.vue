<script lang="ts" setup>
import { OrderType } from '@/types/order';

const props = defineProps<{ type: OrderType }>();
const emit = defineEmits(['add'])
</script>

<template>
  <button @click="emit('add')"
    class="w-full px-6 py-3 rounded-lg font-bold shadow-md text-white transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2"
    :class="props.type === 'vip'
      ? 'bg-green-500 hover:bg-green-600'
      : 'bg-orange-500 hover:bg-orange-600'">
    <span v-if="props.type === 'vip'">⭐ New VIP Order</span>
    <span v-else>🍔 New Normal Order</span>
  </button>
</template>