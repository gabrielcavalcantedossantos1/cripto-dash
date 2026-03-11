import { Link } from "react-router";

export function Header() {
  return (
    <div className="top-nav">
      <Link to="/">Home</Link>
      <Link to="/about">Sobre</Link>
    </div>
  );
}
