import { api } from "@/lib/axios";

export interface getMonthOrdersAmountResponse {
  amount: number;
  diffFromLastMonth: number;
}

export async function getMonthOrdersAmount() {
  const response = await api.get("/metrics/month-orders-amount");

  return response.data;
}
