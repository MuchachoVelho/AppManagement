import { http, HttpResponse } from "msw";

import { getDaysOrdersAmountResponse } from "../api/get-days-orders-amount";

export const getDaysOrdersAmountMock = http.get<
  never,
  never,
  getDaysOrdersAmountResponse
>("metrics/day-orders-amount", () => {
  return HttpResponse.json({
    amount: 20,
    diffFromYesterday: -5,
  });
});
