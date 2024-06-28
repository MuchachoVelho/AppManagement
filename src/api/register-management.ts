import { api } from "@/lib/axios";
export interface registerRestaurantBody {
  email: string;
  phone: string;
  managerName: string;
  localName: string;
}
export async function registerRestaurant({
  email,
  localName,
  managerName,
  phone,
}: registerRestaurantBody) {
  await api.post("/restaurants", { email, localName, managerName, phone });
}
