import { useEffect, useState } from "react";
import { fetchData } from "../api/fetchData";
import { AccountInfo } from "../types/pageData.type";
import { AccountListItem } from "./AccountListItem";
import styles from "./AccountListTable.module.css";
import cx from "classnames"; // using this module,  we can have multiple classname for one element
import Loader from "./Loader";

export const useAccountList = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [accountList, setAccountList] = useState<AccountInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [companyOrder, setCompanyOrder] = useState(false);
  const [dateOrder, setDateOrder] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const data = fetchData();
        const arr: AccountInfo[] = await data;
        const totalAmount = arr.reduce((acc, item) => {
          return acc + item.Amount * 1;
        }, 0);

        // sort the list by date. thinking to have the Date, Company and Account be sortable. we have another section on the page
        // maybe a dropdown to trigger it in real life
        const orderByDate = arr.sort(
          (a, b) => Date.parse(a.Date) - Date.parse(b.Date)
        );

        setAccountList(orderByDate);
        setTotalAmount(totalAmount);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setErrorMessage("some error");
      }
    })();
  }, []);

  const sortByDate = (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    event.preventDefault();
    setDateOrder(!dateOrder);
    setAccountList(
      accountList.sort((a, b) =>
        dateOrder
          ? Date.parse(a.Date) - Date.parse(b.Date)
          : Date.parse(b.Date) - Date.parse(a.Date)
      )
    );
  };
  const sortByName = (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    event.preventDefault();
    setCompanyOrder(!companyOrder);
    setAccountList(
      accountList.sort((a, b) =>
        companyOrder
          ? a.Company.localeCompare(b.Company)
          : b.Company.localeCompare(a.Company)
      )
    );
  };
  return {
    totalAmount,
    accountList,
    isLoading,
    errorMessage,
    sortByName,
    sortByDate,
  };
};

export const AccountListTable = () => {
  const {
    totalAmount,
    accountList,
    isLoading,
    errorMessage,
    sortByName,
    sortByDate,
  } = useAccountList();

  return (
    <>
      {errorMessage && <div className="error">{errorMessage}</div>}
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.accountlistTable} data-testid="account-table">
          <div className={styles.accountTableTH}>
            <span className={styles.accountTableHeader} onClick={sortByDate}>
              Date (Click to sort)
            </span>
            <span className={styles.accountTableHeader} onClick={sortByName}>
              Company (Click to sort)
            </span>
            <span className={styles.accountTableHeader}>Account</span>
            <span className={cx(styles.accountTableHeader, styles.alignRight)}>
              ${totalAmount}
            </span>
          </div>
          {accountList.length > 0 &&
            accountList.map((item, index) => {
              return <AccountListItem {...item} key={item.Company + index} />;
            })}
        </div>
      )}
    </>
  );
};
