<script lang="ts" setup>
import OrderButton from '@/components/OrderButton.vue';
import BotManager from '@/components/BotManager.vue';
import OrderList from '@/components/OrderList.vue';
import BotList from '@/components/BotList.vue';
import { useOrderStore } from '@/stores/orderStore';

const store = useOrderStore();
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
    <header class="text-center mb-8">
      <h1 class="text-4xl font-extrabold text-gray-800">McDonald's Order Controller</h1>
    </header>

    <main class="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">

      <div class="bg-white p-6 rounded-2xl shadow-lg h-[400px]">
        <h2 class="text-xl font-bold text-gray-700 mb-4 border-b pb-2">Controls</h2>
        <div class="space-y-4">
          <OrderButton type="normal" @add="store.addOrder('normal')" />
          <OrderButton type="vip" @add="store.addOrder('vip')" />
          <BotManager />
        </div>
      </div>

      <OrderList :orders="store.orders" title="Pending Orders" />

      <OrderList :orders="store.completedOrders" title="Completed" />

      <BotList />

    </main>
  </div>
</template>