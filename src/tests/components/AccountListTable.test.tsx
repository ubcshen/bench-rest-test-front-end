import { render, waitFor, screen, act } from "@testing-library/react";
import axios from "axios";
import { AccountListTable } from "../../components/AccountListTable";

jest.mock("axios");

const account = {
  totalCount: 1,
  page: 1,
  transactions: [
    {
      Date: "2013-12-22",
      Ledger: "Phone & Internet Expense",
      Amount: "-110.71",
      Company: "SHAW CABLESYSTEMS CALGARY AB",
    },
  ],
};

describe("Account table", () => {
  test("show account table", async () => {
    const res = {
      config: {},
      data: account,
      headers: {},
      status: 200,
      statusText: "OK",
    };
    (axios.get as jest.Mock).mockResolvedValue(res);

    render(<AccountListTable />);
    await waitFor(() => {
      expect(
        screen.getByTestId("account-table")
      ).toBeInTheDocument();
    });
  });

  test("load account list", async () => {
    const res = {
      config: {},
      data: account,
      headers: {},
      status: 200,
      statusText: "OK",
    };
    (axios.get as jest.Mock).mockResolvedValue(res);

    render(<AccountListTable />);

    await waitFor(() => {
      expect(
        screen.getByText(/SHAW CABLESYSTEMS CALGARY AB/i)
      ).toBeInTheDocument();
    });
  });
});
