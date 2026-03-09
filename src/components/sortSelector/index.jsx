export function SortSelector({ sortBy, setSortBy }) {
  return (
    <div className="controls">
      <label htmlFor="sort">Ordenar por:</label>

      <select
        id="sort"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="market_cap_desc">Maior Market Cap</option>
        <option value="market_cap_asc">Menor Market Cap</option>
        <option value="price_desc">Maior Preço</option>
        <option value="price_asc">Menor Preço</option>
        <option value="change_desc">Maior Alta (24h)</option>
        <option value="change_asc">Maior Queda (24h)</option>
      </select>
    </div>
  );
}