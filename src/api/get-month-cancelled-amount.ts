import { api } from "@/lib/axios";

export interface getMonthCancelledOrdersAmountResponse {
  amount: number;
  diffFromLastMonth: number;
}

export async function getMonthCancelledOrdersAmount() {
  const response = await api.get<getMonthCancelledOrdersAmountResponse>(
    "/metrics/month-canceled-orders-amount",
  );

  return response.data;
}
