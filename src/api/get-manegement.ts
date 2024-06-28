import { api } from "../lib/axios";

export interface GetRestaurantResponse {
  id: string;
  name: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  description: string | null;
  managerId: string | null;
}

export async function getManagedRestaurant(): Promise<GetRestaurantResponse> {
  const response = await api.get("/restaurant");

  return response.data;
}
