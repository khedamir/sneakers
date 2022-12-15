import { useEffect, useState } from "react";

import axios from "axios";
import { Route, Routes } from "react-router-dom";

import "./App.scss";

import Drawer from "./components/Drawer/Drawer";
import Header from "./components/Header/Header";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import Orders from "./pages/Orders";

import DataContext from "./context/DataContext";

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [cartOpened, setCartOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const [itemsResponse, favoritesResponse, cartResponse] =
          await Promise.all([
            axios.get("https://6389d0abc5356b25a2098b76.mockapi.io/items"),
            axios.get("https://6389d0abc5356b25a2098b76.mockapi.io/favorites"),
            axios.get("https://6389d0abc5356b25a2098b76.mockapi.io/cart"),
          ]);

        setIsLoading(false);
        setFavorites(favoritesResponse.data);
        setCartItems(cartResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        alert("Ошибка при получении данных");
      }
    }

    fetchData();
  }, []);

  const onChangeCart = async (obj) => {
    try {
      if (cartItems.find((cartObj) => cartObj.parentId === obj.id)) {
        setCartItems((prev) => prev.filter((item) => item.parentId !== obj.id));
        const [cartObj] = cartItems.filter((item) => item.parentId === obj.id);
        axios.delete(
          `https://6389d0abc5356b25a2098b76.mockapi.io/cart/${cartObj.id}`
        );
      } else {
        const { data } = await axios.post(
          "https://6389d0abc5356b25a2098b76.mockapi.io/cart",
          obj
        );
        setCartItems((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("Ошибка при редактировании товаров из корзины");
    }
  };

  const onChangeFavorite = async (obj) => {
    try {
      if (favorites.find((favoriteObj) => favoriteObj.parentId === (obj.parentId || obj.id)) ) {
        setFavorites((prev) => prev.filter((item) => item.parentId !== obj.parentId));
        const [favoriteObj] = favorites.filter((item) => item.parentId === obj.parentId);
        axios.delete(`https://6389d0abc5356b25a2098b76.mockapi.io/favorites/${favoriteObj.id}`)
      } else {
        const {data} = await axios.post("https://6389d0abc5356b25a2098b76.mockapi.io/favorites", obj)
        setFavorites(prev => [...prev, data])
      }

    } catch (error) {
      alert("Ошибка при редактировании закладок")
    }
  }

  return (
    <DataContext.Provider value={{ 
      items, 
      cartItems, setCartItems, 
      favorites, 
      isLoading, 
      onChangeCart, onChangeFavorite
    }}>
      <div className="wrapper">
        <Drawer
          opened={cartOpened}
          onClose={() => setCartOpened(false)}
        />
        <Header onClickCart={() => setCartOpened(true)} />
        <div className="content">
          <Routes>
            <Route path="" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </div>
      </div>
    </DataContext.Provider>
  );
}

export default App;
