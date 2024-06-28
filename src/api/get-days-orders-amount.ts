import { api } from "@/lib/axios";

export interface getDaysOrdersAmountResponse {
  amount: number;
  diffFromYesterday: number;
}

export async function getDaysOrdersAmount() {
  const response = await api.get("/metrics/day-orders-amount");

  return response.data;
}
