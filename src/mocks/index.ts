import { setupWorker } from "msw/browser";

import { env } from "@/env";
import { signInMock } from "./sign-in.mock";
import { registerMock } from "./register.mock";
import { getDaysOrdersAmountMock } from "./get-days-orders-amount";
import { getMonthOrdersAmountMock } from "./get-month-orders-amount";
import { getMonthCancelledOrdersAmountMock } from "./get-month-cancelled-amount";
import { getMonthRevenueCancelledOrdersAmountMock } from "./get-month-revenue";
import { getDailyRevenueInPeriodMock } from "./get-daily-revenue-period";
import { getPopularProductsAmountMock } from "./get-popular-products";
import { getProfileMock } from "./get-profile-mock";
import { getManagedMock } from "./get-managed-mock";
import { updateProfileMock } from "./update-profile-mock";
import { getOrdersMock } from "./get-orders-mock";
import { getDetailsMock } from "./get-orders-details-mock";
import { approveOrderMock } from "./approve-order-mock";
import { canceledOrderMock } from "./canceled-order-mock";
import { deliverOrderMock } from "./deliver-order-mock";
import { dispathOrderMock } from "./dispath-order-mock";

export const worker = setupWorker(
  signInMock,
  registerMock,
  getDaysOrdersAmountMock,
  getMonthOrdersAmountMock,
  getMonthCancelledOrdersAmountMock,
  getMonthRevenueCancelledOrdersAmountMock,
  getDailyRevenueInPeriodMock,
  getPopularProductsAmountMock,
  getProfileMock,
  getManagedMock,
  updateProfileMock,
  getOrdersMock,
  getDetailsMock,
  approveOrderMock,
  canceledOrderMock,
  deliverOrderMock,
  dispathOrderMock,
);

export async function enableMSW() {
  if (env.MODE != "test") {
    return;
  }
  await worker.start();
}
