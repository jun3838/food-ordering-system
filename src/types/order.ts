export type OrderType = 'normal' | 'vip';
export type OrderStatus = 'pending' | 'processing' | 'complete';

export interface Order {
  id: number;
  type: OrderType;
  status: OrderStatus;
}

export interface Bot {
  id: number;
  status: 'idle' | 'processing';
  orderId?: number;
  timer?: ReturnType<typeof setTimeout>;
  currentOrder?: Order;
  progress?: number;
}
