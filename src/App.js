import React from 'react';
import './index.scss';
import Collection from './components/Collection';

const cats = [
  { "name": "Все" },
  { "name": "Море" },
  { "name": "Горы" },
  { "name": "Архитектура" },
  { "name": "Города" }
]

function App() {
  const [categoryId, setCategoryId] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchValue, setSearchValue] = React.useState('');
  const [collection, setCollection] = React.useState([]);

  React.useEffect(() => {
    setIsLoading(true);

    const category = categoryId ? `category=${categoryId}` : '';
    fetch(
      `https://646fb5f309ff19b12087ad29.mockapi.io/photos?page=${page}&limit=3&${category}`)
      .then((response) => response.json())
      .then((json) => {
        setCollection(json);
      })
      .catch((err) => {
        console.error(err);
        alert('Error')
      }).finally(() => {
        setIsLoading(false);
      })

  }, [categoryId, page]);

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {
            cats.map((obj, index) => (
              <li onClick={() => setCategoryId(index)} className={categoryId == index ? 'active' : ''} key={obj.name}>{obj.name}</li>
            ))
          }
        </ul>
        <input value={searchValue} onChange={e => setSearchValue(e.target.value)} className="search-input" placeholder="Поиск по названию" />
      </div>
      <div className="content">
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          collection.filter(obj => {
          return obj.name.toLowerCase().includes(searchValue.toLowerCase());
        })
        .map((obj, index) => (
          <Collection 
          key={index}
          name={obj.name}
          images={obj.photos}
          />
        )))}
      </div>
      <ul className="pagination">
        {[...Array(5)].map((_, index) => (
          <li onClick={() => setPage(index)} className={page == index + 1 ? 'active' : ''}>{index + 1}</li>)
        )
        }
      </ul>
    </div>
  );
}

export default App;
