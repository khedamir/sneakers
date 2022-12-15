import axios from "axios";
import React, { useState } from "react";
import { useCart } from "../../hooks/useCart";
import Button from "../Button/Button";
import Info from "../Info/Info";
import styles from "./Drawer.module.scss";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({ opened, onClose }) {
  const { cartItems, setCartItems, totalPrice } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [isOrderComplete, setIsOrderComplete] = useState(false);

  const onRemoveItem = (id) => {
    try {
      axios.delete(`https://6389d0abc5356b25a2098b76.mockapi.io/cart/${id}`);
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      alert("Ошибка при удалении товара из корзины");
    }
  };

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "https://6389d0abc5356b25a2098b76.mockapi.io/collections",
        { items: cartItems }
      );
      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(
          `https://6389d0abc5356b25a2098b76.mockapi.io/cart/${item.id}`
        );
        await delay(1000);
      }
    } catch (error) {
      alert("No order");
    }
    setIsLoading(false);
  };

  return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ""}`}>
      <div className={styles.drawer}>
        <header className={styles.header}>
          <h2>Корзина</h2>
          <img
            onClick={onClose}
            className="cu-p"
            src="img/btn-remove.svg"
            alt="Close"
          />
        </header>

        {cartItems.length > 0 ? (
          <>
            <div className={styles.items}>
              {cartItems.map((item, index) => (
                <div className={styles.cartItem} key={item.id}>
                  <img
                    className={styles.cartItemImg}
                    src={item.image}
                    alt="Sneakers"
                  />
                  <div className={styles.cartItemDesription}>
                    <p>{item.name}</p>
                    <b>{item.price} руб.</b>
                  </div>
                  <img
                    onClick={() => onRemoveItem(item.id)}
                    className={styles.removeBtn}
                    src="img/btn-remove.svg"
                    alt="Remove"
                  />
                </div>
              ))}
            </div>

            <div className={styles.cartTotalBlock}>
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>{totalPrice} руб.</b>
                </li>
                <li>
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>{(totalPrice * 0.05).toFixed(2)} руб.</b>
                </li>
              </ul>
              <Button disabled={isLoading} onClick={onClickOrder}>
                <>
                  Оформить заказ
                  <img src="img/arrow-rigth.svg" alt="" />
                </>
              </Button>
            </div>
          </>
        ) : (
          <Info
            title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"}
            description={
              isOrderComplete
                ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
            }
            buttonOnClick={onClose}
            image={isOrderComplete ? 'img/complete-order.jpg' : 'img/empty-cart.jpg'}
          />
        )}
      </div>
    </div>
  );
}

export default Drawer;
