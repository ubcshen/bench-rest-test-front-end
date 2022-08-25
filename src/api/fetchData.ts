import axios from "axios"; // using this lib to get better and easy way to fetch all the data

const baseUrl = "https://resttest.bench.co/transactions/";

export const fetchData = async (
  page: number = 1,
  maxPages: number = Number.MAX_VALUE
): Promise<[]> => {
  const query = `${baseUrl}${page}.json`;
  try {
    const response = await axios.get(query);
    const data = response.data;
    const tempMaxPage = Math.ceil(data.totalCount / data.transactions.length);
    const maxPage = tempMaxPage > maxPages ? maxPages : tempMaxPage;
    if (data.page < maxPage) {
      return data.transactions.concat(await fetchData(page + 1, maxPage));
    } else {
      return data.transactions;
    }
  } catch (err) {
    throw new Error("Unable to get data.");
  }
};
