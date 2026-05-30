export default function LojaEsoterica() {
  return (
    <div style={styles.page}>

      {/* FUNDO + TÍTULO */}
      <header style={styles.header}>
        <h1 style={styles.title}>🌿 Botânica Sagrada</h1>
        <p style={styles.subtitle}>
          Natureza • Bruxaria natural • Artesanal energético
        </p>
      </header>

      {/* CATEGORIAS */}
      <section style={styles.categories}>

        <Category name="Velas" />
        <Category name="Óleos" />
        <Category name="Chás" />
        <Category name="Patuá" />
        <Category name="Banhos" />
        <Category name="Kits" />

      </section>

    </div>
  );
}

/* COMPONENTE CATEGORIA */
function Category({ name }) {
  return (
    <div style={styles.categoryItem}>
      <div style={styles.circle}></div>
      <p style={styles.categoryText}>{name}</p>
    </div>
  );
}

/* ESTILOS */
const styles = {
  page: {
    minHeight: "100vh",
    padding: "40px",
    color: "#e9e2f3",
    fontFamily: "Georgia, serif",
    background: `
      radial-gradient(circle at top, rgba(120, 0, 180, 0.25), transparent 40%),
      radial-gradient(circle at bottom, rgba(60, 0, 90, 0.35), transparent 50%),
      linear-gradient(180deg, #0b0810, #120a1a)
    `,
  },

  header: {
    textAlign: "center",
    marginBottom: "50px",
  },

  title: {
    fontSize: "42px",
    letterSpacing: "1px",
    marginBottom: "10px",
  },

  subtitle: {
    color: "#c7b6e6",
    fontSize: "14px",
  },

  categories: {
    display: "flex",
    justifyContent: "center",
    gap: "25px",
    flexWrap: "wrap",
  },

  categoryItem: {
    textAlign: "center",
    cursor: "pointer",
  },

  circle: {
    width: "85px",
    height: "85px",
    borderRadius: "50%",
    margin: "0 auto 10px auto",
    background: `
      radial-gradient(circle at 30% 30%, #a855f7, #3b0764)
    `,
    boxShadow: "0 0 25px rgba(168, 85, 247, 0.35)",
    border: "1px solid rgba(255,255,255,0.1)",
  },

  categoryText: {
    fontSize: "14px",
    color: "#e9e2f3",
  },
};