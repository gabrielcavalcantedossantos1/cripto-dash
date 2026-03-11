import { createContext, useContext, useState } from "react";

export const UseContext = createContext({});

export const ContextProvider = ({ children }) => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("market_cap_desc");
  return (
    <UseContext.Provider
      value={{
        coins,
        setCoins,
        loading,
        setLoading,
        error,
        setError,
        limit,
        setLimit,
        filter,
        setFilter,
        sortBy,
        setSortBy,
      }}
    >
      {children}
    </UseContext.Provider>
  );
};

export function useMyContext() {
  const context = useContext(UseContext);
  if (!context) {
    throw new Error("useMyContext must be used within a ContextProvider");
  }
  return context;
}
