import { http, HttpResponse } from "msw";

import { getMonthCancelledOrdersAmountResponse } from "../api/get-month-cancelled-amount";

export const getMonthCancelledOrdersAmountMock = http.get<
  never,
  never,
  getMonthCancelledOrdersAmountResponse
>("metrics/month-canceled-orders-amount", () => {
  return HttpResponse.json({
    amount: 5,
    diffFromLastMonth: -5,
  });
});
