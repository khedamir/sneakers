import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import CardsList from '../components/CardsList/CardsList';
import Info from '../components/Info/Info';
import DataContext from '../context/DataContext'

function Favorites() {
  const {favorites, isLoading} = useContext(DataContext);
  const route = useNavigate();

  return (
    <div>
      {favorites.length || isLoading ? <header><h1>Мои закладки</h1></header> : null}
      <div className={`favorites ${!favorites.length && !isLoading ? 'no-cards' : ''}`}>
        <CardsList isLoading={isLoading} items={favorites} />
        {!favorites.length && !isLoading ? (
              <Info
                title="Закладок нет :("
                description="Вы ничего не добавляли в закладки"
                image="img/no-orders.svg"
                buttonOnClick={() => route('/')}
              />
          ) : null}
      </div>
    </div>
  )
}

export default Favorites;
