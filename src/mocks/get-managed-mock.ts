import { http, HttpResponse } from "msw";

import { GetManegementResponse } from "../api/get-manegement";

export const getManagedMock = http.get<never, never, GetManegementResponse>(
  "metrics/managed",
  () => {
    return HttpResponse.json({
      id: "custom-software-id",
      name: "John Doe",
      description: "This is a description",
      managerId: "custom-user-id",
      createdAt: new Date(),
      updatedAt: null,
    });
  },
);
