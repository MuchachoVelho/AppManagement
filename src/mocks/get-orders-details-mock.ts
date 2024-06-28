import { http, HttpResponse } from "msw";

import {
  GetOrderDetailsResponse,
  GetOrderDetailsParams,
} from "../api/get-order-details";

export const getDetailsMock = http.get<
  GetOrderDetailsParams,
  never,
  GetOrderDetailsResponse
>("/orders/:orderId", ({ params }) => {
  return HttpResponse.json({
    Id: params.orderId,
    customer: {
      email: "ofkdo@gmail.com",
      name: "silva ",
      phone: "454545",
    },
    status: "pending",
    totalInCents: 9000,
    createdAt: new Date().toISOString(),
    orderItems: [
      {
        id: "order-item-1",
        priceInCents: 1000,
        product: { name: "Software 1" },
        quantity: 1,
      },
      {
        id: "order-item-2",
        priceInCents: 2000,
        product: { name: "Software 2" },
        quantity: 4,
      },
    ],
  });
});
