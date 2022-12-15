import React from "react";
import Card from "../Card/Card";
import styles from "./CardsList.module.scss";

function CardsList({ items, isLoading = false, searchValue = "", change=true }) {
  const filtredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchValue.toLowerCase())
  );
  return (
    <div className={styles.cardsList}>
      {(isLoading ? [...Array(8)] : filtredItems).map((item, index) => (
        <Card isLoading={isLoading} key={index} item = {item} change={change} />
      ))}
    </div>
  );
}

export default CardsList;
