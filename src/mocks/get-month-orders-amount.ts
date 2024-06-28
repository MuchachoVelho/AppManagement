import { http, HttpResponse } from "msw";

import { getMonthOrdersAmountResponse } from "../api/get-month-orders-amout";

export const getMonthOrdersAmountMock = http.get<
  never,
  never,
  getMonthOrdersAmountResponse
>("metrics/month-orders-amount", () => {
  return HttpResponse.json({
    amount: 200,
    diffFromLastMonth: 8,
  });
});
