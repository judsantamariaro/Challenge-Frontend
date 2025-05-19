import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SearchBox from "./SearchBox";
import Breadcrumb from "./Breadcrumb";

type Product = {
  id: "MLA111222";
  title: "iPhone 13 128GB";
  price: { currency: "ARS"; amount: 800000; decimals: 0 };
  picture: "https://your-cdn.com/images/iphone13.jpg";
  condition: "new";
  free_shipping: true;
  sold_quantity: 23;
  description: "El nuevo iPhone 13 con increíble rendimiento y cámara.";
  category: "Celulares";
};

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetch(`http://localhost:3001/api/items/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data.item));
  }, [id]);

  if (!product) return <p>Cargando producto...</p>;

  return (
    <>
      <SearchBox />
      <Breadcrumb categories={[product.category]} />
      <article className="productDetail">
        <div className="productDetail__item">
          <img src={product.picture} loading="lazy" alt={product.title} />
          <div className="productDetail__item__info">
            <p>
              {product.condition} - {product.sold_quantity} vendidos
            </p>
            <h3>{product.title}</h3>
            <p className="productDetail__item__info--price">
              {product.price.currency} {product.price.amount.toLocaleString()}
            </p>
            <button className="productDetail__item__info--buyButton">
              Comprar
            </button>
            {product.free_shipping && (
              <span className="productDetail__item__info--freeShipping">
                Envió Gratis
              </span>
            )}
          </div>
          <section className="productDetail__item__description">
            <h2>Descripción del producto</h2>
            <p>{product.description}</p>
          </section>
        </div>
      </article>
    </>
  );
};

export default ProductDetail;
