import React, { useContext } from "react";
import ContentLoader from "react-content-loader";
import DataContext from "../../context/DataContext";
import styles from "./Card.module.scss";

function Card({ item, isLoading, change }) {
  const { onChangeCart, cartItems, onChangeFavorite, favorites } = useContext(DataContext);

  const isItemAdded = (id) => {
    return cartItems.some((obj) => obj.parentId === id);
  }

  const isFavoriteAdded = (id) => {
    return favorites.some((obj => obj.parentId === id))
  }

  return (
    <div className={styles.card}>
      {isLoading ? (
        <ContentLoader
          speed={2}
          width={155}
          height={225}
          viewBox="0 0 155 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="1" y="0" rx="10" ry="10" width="155" height="155" />
          <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
          <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
          <rect x="1" y="234" rx="5" ry="5" width="80" height="25" />
          <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          <div className={styles.favorite}>
            {change && <img
              src={isFavoriteAdded(item.parentId || item.id) ? "img/liked.svg" : "img/unliked.svg"}
              onClick={() => onChangeFavorite({...item, parentId: item.parentId || item.id})}
              alt="Favorited"
            />}
          </div>
          <img width={133} height={112} src={item.image} alt="" />
          <h5>{item.name}</h5>
          <div className={styles.itemDescription}>
            <div className={styles.price}>
              <span>Цена: </span> <b>{item.price} руб.</b>
            </div>
            {change && <img
              src={isItemAdded(item.id) ? "/img/btn-checked.svg" : "/img/btn-plus.svg"}
              onClick={() => onChangeCart({...item, parentId: item.id})}
              className={styles.plus}
              width={32}
              height={32}
              alt="Plus"
            />}
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
