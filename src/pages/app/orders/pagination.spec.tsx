import { render } from "@testing-library/react";
import { Pagination } from "./pagination";
import userEvent from "@testing-library/user-event";

const onPageChangeCallBack = vi.fn();

describe("Pagination", () => {
  beforeEach(() => {
    onPageChangeCallBack.mockClear();
  });
  it("should be display the right amount  of pages  and results", () => {
    const wrapper = render(
      <Pagination
        pageIndex={0}
        perPage={10}
        totalCount={200}
        onPageChange={onPageChangeCallBack}
      />,
    );

    expect(wrapper.getByText("Page 1 of 20")).toBeInTheDocument(),
      expect(wrapper.getByText("Total of 200 registers")).toBeInTheDocument(),
      "";
  });

  it("should be able  to navigate  to the next page", async () => {
    const user = userEvent.setup();
    const wrapper = render(
      <Pagination
        pageIndex={0}
        perPage={10}
        totalCount={200}
        onPageChange={onPageChangeCallBack}
      />,
    );
    const nextPageButton = wrapper.getByRole("button", {
      name: "Next Page",
    });
    await user.click(nextPageButton);

    expect(onPageChangeCallBack).toHaveBeenCalledWith(1);
  });

  it("should be able to navigate  to the previous page", async () => {
    const user = userEvent.setup();
    const wrapper = render(
      <Pagination
        pageIndex={5}
        perPage={10}
        totalCount={200}
        onPageChange={onPageChangeCallBack}
      />,
    );
    const nextPageButton = wrapper.getByRole("button", {
      name: "Before Page",
    });
    await user.click(nextPageButton);

    expect(onPageChangeCallBack).toHaveBeenCalledWith(4);
  });

  it("should be able to navigate  to the first page", async () => {
    const user = userEvent.setup();
    const wrapper = render(
      <Pagination
        pageIndex={5}
        perPage={10}
        totalCount={200}
        onPageChange={onPageChangeCallBack}
      />,
    );
    const nextPageButton = wrapper.getByRole("button", {
      name: "First Page",
    });
    await user.click(nextPageButton);

    expect(onPageChangeCallBack).toHaveBeenCalledWith(0);
  });

  it("should be able to navigate  to the last page", async () => {
    const user = userEvent.setup();
    const wrapper = render(
      <Pagination
        pageIndex={1}
        perPage={10}
        totalCount={200}
        onPageChange={onPageChangeCallBack}
      />,
    );
    const nextPageButton = wrapper.getByRole("button", {
      name: "last Page",
    });
    await user.click(nextPageButton);

    expect(onPageChangeCallBack).toHaveBeenCalledWith(19);
  });
});
