import { CoinCard } from "../../components/CoinCard";
import { LimitSelector } from "../../components/limitSelector";
import { FilterInput } from "../../components/filterInput";
import { SortSelector } from "../../components/sortSelector";

import { useMyContext } from "../../context/context";

export function Home() {
  const {
    coins,
    loading,
    error,
    limit,
    setLimit,
    filter,
    setFilter,
    sortBy,
    setSortBy,
  } = useMyContext();
  const filteredCoins = coins
    .filter((coin) => {
      return (
        coin.name.toLowerCase().includes(filter.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(filter.toLowerCase())
      );
    })
    .slice()
    .sort((a, b) => {
      switch (sortBy) {
        case "market_cap_desc":
          return b.market_cap - a.market_cap;
        case "market_cap_asc":
          return a.market_cap - b.market_cap;
        case "price_desc":
          return b.current_price - a.current_price;
        case "price_asc":
          return a.current_price - b.current_price;
        case "change_desc":
          return b.price_change_percentage_24h - a.price_change_percentage_24h;
        case "change_asc":
          return a.price_change_percentage_24h - b.price_change_percentage_24h;
        default:
          return 0;
      }
    });
  return (
    <div>
      <h1>🚀 Crypto Dash</h1>

      <div className="top-controls">
        <FilterInput filter={filter} setFilter={setFilter} />

        <SortSelector sortBy={sortBy} setSortBy={setSortBy} />

        <LimitSelector limit={limit} setLimit={setLimit} />
      </div>

      {loading ? (
        <div className="spinner"></div>
      ) : error ? (
        <div style={{ textAlign: "center" }}>{error}</div>
      ) : (
        <main className="grid">
          {filteredCoins.map((coin) => (
            <CoinCard key={coin.id} coin={coin} />
          ))}
        </main>
      )}
    </div>
  );
}
import { useState } from "react";
