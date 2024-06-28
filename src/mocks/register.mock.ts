import { http, HttpResponse } from "msw";
import { registerManagementBody } from "../api/register-management";
export const registerMock = http.post<never, registerManagementBody>(
  "/managements",
  async ({ request }) => {
    const { managerName } = await request.json();

    if (managerName === "muchacho") {
      return new HttpResponse(null, {
        status: 201,
      });
    }
    return new HttpResponse(null, { status: 400 });
  },
);
