import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import styles from "./Header.module.scss";

function Header({ onClickCart }) {
  const { totalPrice } = useCart();

  return (
    <header className={styles.header}>
      <Link to={""}>
        <div className={styles.logo}>
          <img width={40} height={40} src="img/logo.png" alt="Logo" />
          <div>
            <h3>React Sneakers</h3>
            <p>Магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>
      <ul className={styles.nav}>
        <li onClick={onClickCart} className={styles.navItem}>
          <img width={18} height={18} src="img/cart.svg" alt="Cart" />
          <span>{totalPrice}</span>
        </li>
        <li className={styles.navItem}>
          <Link to={"favorites"}>
            <img width={18} height={18} src="img/heart.svg" alt="Favorites" />
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link to={"orders"}>
            <img width={18} height={18} src="img/user.svg" alt="Orders" />
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
