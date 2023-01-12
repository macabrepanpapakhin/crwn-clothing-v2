import { createContext, useState, useEffect } from "react";
import { SHOP_DATA } from "../shop-data";
import { addColelctionsAndDocuments } from "../utils/firebase/firebase.utils";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";
export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});

  useEffect(() => {
    const categoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      console.log("categoryMaps");
      console.log(categoryMap);
      setCategoriesMap(categoryMap);
    };
    categoriesMap();
  }, []);

  // useEffect(() => {
  //   addColelctionsAndDocuments("items", SHOP_DATA);
  // }, []);

  const value = { categoriesMap };
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
