import { StatusOrder } from "@/pages/app/orders/order-status";
import { render } from "@testing-library/react";

describe("order status", () => {
  it("should render the right text when order status is pending", () => {
    // Pending
    const wrapper = render(<StatusOrder status="pending" />);
    const statusText = wrapper.getByText("pending");

    const badgeElement = wrapper.getByTestId("badge");

    expect(statusText).toBeInTheDocument();
    expect(badgeElement).toHaveClass("bg-slate-400");
  });
  // Cancelled
  it("should render the right text when order status is canceled", () => {
    const wrapper = render(<StatusOrder status="canceled" />);
    const statusText = wrapper.getByText("canceled");

    const badgeElement = wrapper.getByTestId("badge");

    expect(statusText).toBeInTheDocument();
    expect(badgeElement).toHaveClass("bg-rose-500");
  });

  // Delivered
  it("should render the right text when order status is delivered", () => {
    const wrapper = render(<StatusOrder status="delivered" />);
    const statusText = wrapper.getByText("delivered");

    const badgeElement = wrapper.getByTestId("badge");

    expect(statusText).toBeInTheDocument();
    expect(badgeElement).toHaveClass("bg-emerald-500");
  });

  // Processing
  it("should render the right text when order status is processing", () => {
    const wrapper = render(<StatusOrder status="processing" />);
    const statusText = wrapper.getByText("processing");

    const badgeElement = wrapper.getByTestId("badge");

    expect(statusText).toBeInTheDocument();
    expect(badgeElement).toHaveClass("bg-amber-500");
  });

  // Delivering
  it("should render the right text when order status is delivering", () => {
    const wrapper = render(<StatusOrder status="delivering" />);
    const statusText = wrapper.getByText("delivering");

    const badgeElement = wrapper.getByTestId("badge");

    expect(statusText).toBeInTheDocument();
    expect(badgeElement).toHaveClass("bg-amber-500");
  });
});
