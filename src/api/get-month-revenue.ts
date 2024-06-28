import { api } from "@/lib/axios";

export interface getMonthRevenueResponse {
  receipt: number;
  diffFromLastMonth: number;
}

export async function getMonthRevenue() {
  const response = await api.get("/metrics/month-receipt");

  return response.data;
}
