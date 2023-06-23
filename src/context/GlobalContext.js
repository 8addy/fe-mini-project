import React, { createContext, useContext, useState } from "react";
import { AuthContext } from "./AuthContext";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [isDrawerOpen, setOpenDrawer] = useState(false);
  const [isSearchModalOpen, setSearchModalOpen] = useState(false);
  const [searchResult, setSearchResult] = useState(null);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [isSearchLoading, setSearchLoading] = useState(false);

  const handleDrawer = () => {
    setOpenDrawer((prev) => !prev);
  };

  const searchModalHandler = () => {
    setSearchModalOpen((prev) => !prev);
  };

  const searchingHandler = async (query) => {
    try {
      searchModalHandler();
      setIsSearchMode(true);
      setSearchLoading(true);
      const response = await fetch(
        `http://localhost:8080/api/v1/articles/search?query=${query}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${user?.accessToken}`,
          },
        }
      );
      if (response.ok) {
        const result = await response.json();
        setSearchResult(result);
      }
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      setSearchLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchResult(null);
    setIsSearchMode(false);
  };

  return (
    <GlobalContext.Provider
      value={{
        isDrawerOpen,
        handleDrawer,
        searchModalHandler,
        isSearchModalOpen,
        searchingHandler,
        searchResult,
        isSearchMode,
        isSearchLoading,
        clearSearch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
