import { useState } from "react";
import { fetchData } from "../api/fetchData";
import { AccountInfo } from "../types/pageData.type";
import { AccountListItem } from "./AccountListItem";
import styles from "./AccountListTable.module.css";
import cx from "classnames"; // using this module,  we can have multiple classname for one element

export const AccountListTable = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [accountList, setAccountList] = useState<AccountInfo[]>([]);
  const data = (async () => {
    return await fetchData();
  })();
  (async () => {
    const arr: AccountInfo[] = await data;
    const totalAmount = arr.reduce((acc, item) => {
      return acc + item.Amount * 1;
    }, 0);

    // sort the list by date. thinking to have the Date, Company and Account be sortable. we have another section on the page
    // maybe a dropdown to trigger it in real life
    const sortByDate = arr.sort(
      (a, b) => Date.parse(a.Date) - Date.parse(b.Date)
    );
    setAccountList(sortByDate);
    setTotalAmount(totalAmount);
  })();
  return (
    <div className={styles.accountlistTable}>
      <div className={styles.accountTableTH}>
        <span className={styles.accountTableHeader}>Date</span>
        <span className={styles.accountTableHeader}>Company</span>
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
  );
};
