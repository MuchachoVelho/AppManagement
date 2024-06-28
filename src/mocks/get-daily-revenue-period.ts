import { http, HttpResponse } from "msw";

import { getDailyRevenueInPeriodResponse } from "../api/get-daily-revenue-in-period";

export const getDailyRevenueInPeriodMock = http.get<
  never,
  never,
  getDailyRevenueInPeriodResponse
>("metrics/daily-receipt-in-period", () => {
  return HttpResponse.json([
    { date: "2021-08-01", receipt: 200 },
    { date: "2021-08-02", receipt: 100 },
    { date: "2021-08-03", receipt: 300 },
    { date: "2021-08-04", receipt: 400 },
  ]);
});
