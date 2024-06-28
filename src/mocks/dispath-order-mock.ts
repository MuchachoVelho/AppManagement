import { DispathOrderParams } from "@/api/dispath-order";
import { HttpResponse, http } from "msw";

export const dispathOrderMock = http.patch<DispathOrderParams, never, never>(
  "/orders/:orderId/dispath",
  async ({ params }) => {
    if (params.orderId === "error-order-id") {
      return new HttpResponse(null, { status: 400 });
    }
    return new HttpResponse(null, { status: 204 });
  },
);
