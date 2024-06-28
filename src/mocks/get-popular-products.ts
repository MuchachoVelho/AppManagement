import { http, HttpResponse } from "msw";

import { getPopularProductsResponse } from "../api/get-popular-products";

export const getPopularProductsAmountMock = http.get<
  never,
  never,
  getPopularProductsResponse
>("metrics/popular-products", () => {
  return HttpResponse.json([
    { product: "Product 1", amount: 10 },
    { product: "Product 2", amount: 5 },
    { product: "Product 3", amount: 3 },
  ]);
});
