import React, { useContext, useState, useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";
import { usePriceFormatter } from "../../hooks/usePriceFormatter";
import { ProductsTotalCountContext } from "../App/App";
import ProductTool from "../ProductTool/ProductTool";

const ProductList = () => {
  const formatPrice = usePriceFormatter("zł", ",");
  const [totalCount] = useContext(ProductsTotalCountContext);
  const [products, setProducts] = useState([]);

  useEffect(async () => {
    const products = await useFetch({ url: "/api/cart" });
    setProducts(products);
  }, []);

  return (
    <div className="container">
      <h3>Lista produktów:</h3>
      {products.length ? (
        <ul>
          {products.map(({ pid, name, price, min, max, isBlocked }) => (
            <li key={pid} className="row">
              <span>
                {name}, cena: {formatPrice(price)}
              </span>
              <ProductTool
                min={min}
                isBlocked={isBlocked}
                pid={pid}
                max={max}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
      <h4>Wszystkich produktów w koszyku: {totalCount}</h4>
    </div>
  );
};

export default ProductList;
