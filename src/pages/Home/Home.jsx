import React from "react";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.container}>
      <h2>Bienvenido a la aplicación 🎉</h2>
      <p>Has iniciado sesión correctamente.</p>
    </div>
  );
};

export default Home;
