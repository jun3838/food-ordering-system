import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { resetStore, SIMULATION_DURATION, useOrderStore } from '@/stores/orderStore';

describe('Order Store', () => {
  beforeEach(() => {
    resetStore();
    vi.useFakeTimers();
  })

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers
  });

  it('adds normal orders to pending', () => {
    const store = useOrderStore();
    store.addOrder('normal');

    expect(store.orders.length).toBe(1);
    expect(store.orders[0].type).toBe('normal');
    expect(store.orders[0].status).toBe('pending');
  });

  it('adds VIP orders before normal orders', () => {
    const store = useOrderStore();
    store.addOrder('normal');
    store.addOrder('vip');

    expect(store.orders[0].type).toBe('vip');
    expect(store.orders[1].type).toBe('normal');
  });

  it('queues VIP orders behind existing VIPs', () => {
    const store = useOrderStore();
    store.addOrder('normal');
    store.addOrder('vip');
    store.addOrder('vip');

    expect(store.orders[0].type).toBe('vip');
    expect(store.orders[0].id).toBe(2);
    expect(store.orders[1].type).toBe('vip');
    expect(store.orders[1].id).toBe(3);
    expect(store.orders[2].type).toBe('normal');
    expect(store.orders[2].id).toBe(1);
  });

  it('bots process orders and move them to complete', () => {
    const store = useOrderStore();
    store.addOrder('normal');
    store.addBot();

    expect(store.bots[0].status).toBe('processing');

    vi.advanceTimersByTime(SIMULATION_DURATION);
    vi.runAllTimers(); // flush all timers

    expect(store.completedOrders.length).toBe(1);
    expect(store.completedOrders[0].status).toBe('complete');
    expect(store.bots[0].status).toBe('idle');
  });

  it('bot becomes idle if no pending orders', () => {
    const store = useOrderStore();
    store.addBot();
    expect(store.bots[0].status).toBe('idle');
  });

  it('removing a bot stops processing and returns order to pending', () => {
    const store = useOrderStore();
    store.addOrder('normal');
    store.addBot();

    expect(store.bots.length).toBe(1);
    expect(store.bots[0].status).toBe('processing');

    store.removeBot();

    expect(store.bots.length).toBe(0);
    expect(store.orders.length).toBe(1);
    expect(store.orders[0].status).toBe('pending');
  });
});
