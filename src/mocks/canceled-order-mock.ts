import { CancelOrderParams } from "@/api/cancel-order";
import { HttpResponse, http } from "msw";

export const canceledOrderMock = http.patch<CancelOrderParams, never, never>(
  "/orders/:orderId/canceled",
  async ({ params }) => {
    if (params.orderId === "error-order-id") {
      return new HttpResponse(null, { status: 400 });
    }
    return new HttpResponse(null, { status: 204 });
  },
);
