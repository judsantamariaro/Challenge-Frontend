import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import SearchBox from "./SearchBox";
import Breadcrumb from "./Breadcrumb";

type Item = {
  id: string;
  title: string;
  price: { currency: string; amount: number; decimals: number };
  picture: string;
  condition: string;
  free_shipping: boolean;
};

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("search") ?? "";
  const [items, setItems] = useState<Item[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    fetch(`http://localhost:3001/api/items?q=${encodeURIComponent(query)}`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.categories ?? []);
        setItems((data.items ?? []).slice(0, 6));
      });
  }, [query]);

  return (
    <>
      <SearchBox />
      {categories.length > 0 && (
        <div className="searchResults__categories">
          <Breadcrumb categories={categories} />
        </div>
      )}
      {items.length > 0 ? (
        <div className="searchResults">
          {items.map((item) => (
            <Link
              key={item.id}
              to={`/items/${item.id}`}
              className="searchResults__item"
            >
              <img src={item.picture} loading="lazy" alt={item.title} />
              <div>
                <p>
                  {item.price.currency} {item.price.amount.toLocaleString()}
                </p>
                <h3>{item.title}</h3>
              </div>
              {item.free_shipping && (
                <span className="searchResults__item--free_shipping">
                  Gratis envío
                </span>
              )}
            </Link>
          ))}
        </div>
      ) : (
        <div className="searchResults__no-results">
          <h2>No se encontraron resultados para {query}</h2>
        </div>
      )}
    </>
  );
};

export default SearchResults;
