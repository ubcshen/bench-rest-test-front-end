import { AccountInfo } from "../types/pageData.type";
import styles from "./AccountListItem.module.css";
import cx from "classnames";

export const AccountListItem = (items: AccountInfo) => {
  const accountDate = new Date(items.Date).toLocaleString(undefined, {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
  return (
    <div className={styles.accountTableListTH}>
      <span className={cx(styles.accountTableList, styles.lightGery)}>
        {accountDate}
      </span>
      <span className={styles.accountTableList}>{items.Company}</span>
      <span className={cx(styles.accountTableList, styles.lightGery)}>
        {items.Ledger}
      </span>
      <span className={cx(styles.accountTableList, styles.alignRight)}>
        ${items.Amount}
      </span>
    </div>
  );
};
