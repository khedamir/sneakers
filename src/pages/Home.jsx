import React, { useContext, useState } from 'react'
import CardsList from '../components/CardsList/CardsList';
import Search from '../components/Search/Search';
import DataContext from '../context/DataContext'

function Home() {
  const {items, isLoading} = useContext(DataContext);
  const [searchValue, setSearchValue] = useState('');

  return (
    <>
      <header>
        <h1>{searchValue ? `Поиск по запросу: ${searchValue}` : 'Все кроссовки'}</h1>
        <Search value={searchValue} onChangeInput={setSearchValue} />
      </header>
      <CardsList items={items} isLoading={isLoading} searchValue={searchValue} />
        
    </>
  )
}

export default Home
