import { api } from "@/lib/axios";

export interface DispathOrderParams {
  orderId: string;
}

export async function dispathOrder({ orderId }: DispathOrderParams) {
  await api.patch(`/orders/${orderId}/dispath`);
}
