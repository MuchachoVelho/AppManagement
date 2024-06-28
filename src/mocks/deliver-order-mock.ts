import { DeliverOrderParams } from "@/api/deliver-order";
import { HttpResponse, http } from "msw";

export const deliverOrderMock = http.patch<DeliverOrderParams, never, never>(
  "/orders/:orderId/deliver",
  async ({ params }) => {
    if (params.orderId === "error-order-id") {
      return new HttpResponse(null, { status: 400 });
    }
    return new HttpResponse(null, { status: 204 });
  },
);
