import { http, HttpResponse } from "msw";

import { getMonthRevenueResponse } from "../api/get-month-revenue";

export const getMonthRevenueCancelledOrdersAmountMock = http.get<
  never,
  never,
  getMonthRevenueResponse
>("metrics/month-receipt", () => {
  return HttpResponse.json({
    receipt: 20005,
    diffFromLastMonth: 15,
  });
});
