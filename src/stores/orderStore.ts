import { reactive, readonly } from 'vue';
import { Order, OrderType, Bot } from '../types/order';

export const SIMULATION_DURATION = 5000;

const state = reactive({
  orders: [] as Order[],
  completedOrders: [] as Order[],
  bots: [] as Bot[],
  nextOrderId: 1,
  nextBotId: 1,
});

function addOrder(type: OrderType) {
  const order: Order = {
    id: state.nextOrderId++,
    type,
    status: 'pending',
  };
  // VIP orders go before normal orders but after other VIPs
  if (type === 'vip') {
    const vipCount = state.orders.filter(o => o.type === 'vip').length;
    state.orders.splice(vipCount, 0, order);
  } else {
    state.orders.push(order);
  }
  processOrders();
}

function addBot() {
  const bot: Bot = {
    id: state.nextBotId++,
    status: 'idle',
    progress: 0,
  };
  state.bots.push(bot);
  processOrders();
}

function removeBot() {
  const bot = state.bots.pop();
  if (bot && bot.status === 'processing' && bot.orderId) {
    if (bot.timer) clearTimeout(bot.timer);
    // Return order to pending
    const order = state.orders.find(o => o.id === bot.orderId);
    if (order) {
      order.status = 'pending';
    }
    bot.currentOrder = undefined;
    bot.progress = 0;
  }
}

function processOrders() {
  state.bots.forEach(bot => {
    if (bot.status === 'idle') {
      const order = state.orders.find(o => o.status === 'pending');
      if (order) {
        // Set bot to processing order state
        bot.status = 'processing';
        bot.orderId = order.id;
        bot.currentOrder = order;
        bot.progress = 0;
        order.status = 'processing';

        const start = Date.now();

        const tick = () => {
          const elapsed = Date.now() - start;
          bot.progress = Math.min(100, Math.round((elapsed / SIMULATION_DURATION) * 100));

          if (elapsed >= SIMULATION_DURATION) {
            // Order complete
            order.status = 'complete';
            state.completedOrders.push(order);

            const currentOrderIndex = state.orders.findIndex(o => o.id === order.id);
            state.orders.splice(currentOrderIndex, 1);

            // Set bot to idle state
            bot.status = 'idle';
            bot.orderId = undefined;
            bot.currentOrder = undefined;
            bot.progress = 0;
            bot.timer = undefined;

            // Process next order
            processOrders();
          } else {
            // Schedule next tick
            bot.timer = setTimeout(tick, 1000);
          }
        };

        // Start the loop
        bot.timer = setTimeout(tick, 1000);
      }
    }
  });
}

export function useOrderStore() {
  return {
    ...readonly(state),
    addOrder,
    addBot,
    removeBot,
    processOrders
  };
}

export function resetStore() {
  state.orders = [];
  state.bots = [];
  state.completedOrders = [];
  state.nextOrderId = 1;
  state.nextBotId = 1;
}