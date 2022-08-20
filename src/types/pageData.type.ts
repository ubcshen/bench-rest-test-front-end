export type PageData = {
  totalCount: number;
  transactions: Transaction[];
};

export type Transaction = {
  date: string;
  ledger: string;
  amount: string;
  company: string;
}

export type AccountInfo = {
  Date: string;
  Ledger: string;
  Amount: number;
  Company: string;
}
