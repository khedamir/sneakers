import React from "react";
import styles from "./Search.module.scss";

function Search({ value, onChangeInput }) {
  return (
    <div className={styles.searchBlock}>
      <img src="img/search.svg" alt="Search" />

      {value && (
        <img
          onClick={() => onChangeInput("")}
          src="img/btn-remove.svg"
          className={styles.clear}
          alt="clear"
        />
      )}

      <input
        value={value}
        onChange={(event) => onChangeInput(event.target.value)}
        placeholder="Search..."
      />
      
    </div>
  );
}

export default Search;
