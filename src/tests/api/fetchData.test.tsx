import axios from "axios";
import { fetchData } from "../../api/fetchData";

jest.mock("axios");

describe("Test Fetch", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("fetch successfully", async () => {
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
    (axios.get as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        data: account,
      })
    );

    try {
      const response = await fetchData();
      expect(response).toBeDefined();
    } catch (e) {
      expect(e).toEqual("Error");
    }
  });

  test("fetches erroneously data from an API", async () => {
    const errorMessage = "Some Error";

    (axios.get as jest.Mock).mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage))
    );
  });
});
