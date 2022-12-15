import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardsList from "../components/CardsList/CardsList";
import Info from "../components/Info/Info";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const route = useNavigate()

  useEffect(() => {
    setIsLoading(true);
    async function fetchData() {
      try {
        const { data } = await axios.get(
          "https://6389d0abc5356b25a2098b76.mockapi.io/collections"
        );
        setOrders(data);
        setIsLoading(false);
      } catch (error) {
        alert("Ошибка при получении заказов");
      }
    }

    fetchData();
  }, []);

  return (
    <>
      {orders.length ? <header className="order-header"><h1>Мои заказы</h1></header> : null}
      <div className={`orders ${!orders.length && !isLoading ? 'no-cards' : ''}`}>
        {(isLoading ? [...Array(1)] : orders).map((order, index) => (
          <div key={index}>
            <h2>{`Заказ #${isLoading ? index + 1 : order.id}`}</h2>
            <CardsList
              items={order ? order.items : []}
              isLoading={isLoading}
              change={false}
            />
          </div>
        ))}
        {!orders.length && !isLoading ? (
            <Info
              title="У вас нет заказов"
              description="Вы нищеброд? Оформите хотя бы один заказ."
              image="img/no-orders.svg"
              buttonOnClick={() => route('/')}
            />
        ) : null}
      </div>
    </>
  );
}

export default Orders;
