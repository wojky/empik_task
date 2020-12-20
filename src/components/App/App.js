import React, { createContext, useState } from "react";
import ProductList from "../ProductList/ProductList";
import "./App.css";

export const ProductsTotalCountContext = createContext([0, () => {}]);

const App = () => {
  const totalCountState = useState(0);

  return (
    <ProductsTotalCountContext.Provider value={totalCountState}>
      <ProductList />
    </ProductsTotalCountContext.Provider>
  );
};

export { App };
