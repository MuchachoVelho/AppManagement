import { ApproveOrderParams } from "@/api/approve-order";
import { HttpResponse, http } from "msw";

export const approveOrderMock = http.patch<ApproveOrderParams, never, never>(
  "/orders/:orderId/approve",
  async ({ params }) => {
    if (params.orderId === "error-order-id") {
      return new HttpResponse(null, { status: 400 });
    }
    return new HttpResponse(null, { status: 204 });
  },
);
