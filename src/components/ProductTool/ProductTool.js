import React, { useContext, useState } from "react";
import { ProductsTotalCountContext } from "../App/App";
import { useFetch } from "../../hooks/useFetch";
import ProductActions from "./actions";

const ProductTool = ({ pid, max, min, isBlocked }) => {
  const [totalCount, setTotalCount] = useContext(ProductsTotalCountContext);
  const [checking, setChecking] = useState(false);
  const [debounce, setDebounce] = useState(null);
  const [product, setProduct] = useState({
    max,
    min,
    isBlocked,
    count: 0,
  });

  function handleIncreaseCount() {
    setProduct({ ...product, count: product.count + 1 });
    setTotalCount(totalCount + 1);

    if (debounce) {
      clearTimeout(debounce);
    }

    setDebounce(
      setTimeout(() => {
        setChecking(true);
        useFetch({
          url: "/api/product/check",
          method: "POST",
          body: {
            quantity: product.count,
            pid,
          },
        })
          .catch(() => {
            alert(`Too many products! Max is ${product.max}`);
            setTotalCount(totalCount - product.count + product.min);
            setProduct({ ...product, count: product.min });
          })
          .finally(() => {
            setChecking(false);
          });
      }, 400)
    );
  }

  function changeCount(action) {
    if (action === ProductActions.INCREASE) {
      handleIncreaseCount();
    } else if (action === ProductActions.DECREASE) {
      setProduct({ ...product, count: product.count - 1 });
      setTotalCount(totalCount - 1);
    }
  }

  return (
    <div>
      <span>Obecnie masz {product.count} sztuk produktu</span>
      <button
        disabled={checking || product.isBlocked}
        onClick={() => changeCount(ProductActions.INCREASE)}
      >
        +
      </button>
      <button
        disabled={checking || product.isBlocked || product.count === 0}
        onClick={() => changeCount(ProductActions.DECREASE)}
      >
        -
      </button>
      {checking && <span>Dodawanie produktu...</span>}
    </div>
  );
};

export default ProductTool;
