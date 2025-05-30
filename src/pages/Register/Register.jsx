import React, { useState } from 'react';
import styles from './Register.module.css';
import { validateEmail } from '../../utils/validation';

const Register = () => {
  const [dni, setDni] = useState('');
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const [confirmClave, setConfirmClave] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

       if (!validateEmail(correo)) {
      alert('Por favor, ingrese un correo electrónico válido');
      return;
    }

    if (clave !== confirmClave) {
      alert('Las claves no coinciden');
      return;
    }

    // Aquí iría la lógica de registro (API, Firebase, etc)
    alert(`Registrando usuario con DNI: ${dni}`);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Registrar Usuario</h2>

        <label htmlFor="dni">DNI:</label>
        <input
          id="dni"
          type="text"
          value={dni}
          onChange={(e) => setDni(e.target.value)}
          required
          placeholder="Ingrese su DNI"
        />

        <label htmlFor="correo">Correo electrónico:</label>
        <input
          id="correo"
          type="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
          placeholder="Ingrese su correo electrónico"
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

        <label htmlFor="confirmClave">Confirmar Clave:</label>
        <input
          id="confirmClave"
          type="password"
          value={confirmClave}
          onChange={(e) => setConfirmClave(e.target.value)}
          required
          placeholder="Confirme su clave"
        />

        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default Register;
