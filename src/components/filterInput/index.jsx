export function FilterInput({ filter, setFilter }) {
  return (
    <div className="filter">
      <input
        type="text"
        value={filter}
        placeholder="Buscar moeda"
        onChange={(e) => setFilter(e.target.value)}
      />
    </div>
  );
}
