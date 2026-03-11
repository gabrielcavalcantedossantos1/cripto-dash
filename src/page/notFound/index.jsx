import { Link } from "react-router";

export function NotFound() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404</h1>
      <p style={styles.message}>
        Oops! A página que você procurava nao foi encontrada.
      </p>
      <Link to="/" style={styles.link}>
        ⬅️ Voltar para a Home
      </Link>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "80px 20px",
    backgroundColor: "#1c1f26",
    borderRadius: "12px",
    maxWidth: "600px",
    margin: "0 auto",
    color: "#fff",
  },
  title: {
    fontSize: "72px",
    marginBottom: "20px",
  },
  message: {
    fontSize: "18px",
    marginBottom: "30px",
  },
  link: {
    textDecoration: "none",
    color: "#007bff",
    fontWeight: "bold",
  },
};
