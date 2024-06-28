import { http, HttpResponse } from "msw";

import { GetProfileResponse } from "../api/get-profile";

export const getProfileMock = http.get<never, never, GetProfileResponse>(
  "/me",
  () => {
    return HttpResponse.json({
      id: "1",
      name: "John Doe",
      email: "ogfgodk@gmail.com",
      phone: "1234567890",
      role: "manager",
      createdAt: new Date(),
      updatedAt: null,
    });
  },
);
