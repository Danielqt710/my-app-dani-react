import React, { useState } from 'react';
import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [dni, setDni] = useState('');
  const [clave, setClave] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la validación / autenticación
    alert(`Intentando login con DNI: ${dni} y clave: ${clave}`);
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Login</h2>
        <label htmlFor="dni">DNI:</label>
        <input
          id="dni"
          type="text"
          value={dni}
          onChange={(e) => setDni(e.target.value)}
          required
          placeholder="Ingrese su DNI"
        />

        <label htmlFor="clave">Clave:</label>
        <input
          id="clave"
          type="password"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
          required
          placeholder="Ingrese su clave"
        />

        <button type="submit">Ingresar</button>
      </form>
      <button className={styles.registerBtn} onClick={handleRegister}>
        Registrarse
      </button>
    </div>
  );
};

export default Login;
