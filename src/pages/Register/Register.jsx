// src/pages/Register/Register.jsx
import React, { useState } from 'react';
import { auth, db } from '../../services/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { validateEmail } from '../../utils/validation';
import styles from './Register.module.css';

const Register = () => {
  const [dni, setDni] = useState('');
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const [confirmarClave, setConfirmarClave] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(correo)) {
      alert('Por favor, ingrese un correo electrónico válido');
      return;
    }

    if (clave !== confirmarClave) {
      alert('Las contraseñas no coinciden');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, correo, clave);
      const user = userCredential.user;

      // Guardar info adicional en Firestore
      await setDoc(doc(db, 'usuarios', user.uid), {
        uid: user.uid,
        correo,
        dni,
        creado: new Date()
      });

      alert(`Usuario registrado con éxito: ${user.email}`);

      // Limpiar el formulario
      setDni('');
      setCorreo('');
      setClave('');
      setConfirmarClave('');
    } catch (error) {
      alert(`Error al registrar usuario: ${error.message}`);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Registrar Usuario</h2>

        <label htmlFor="dni">DNI</label>
        <input
          type="text"
          id="dni"
          value={dni}
          onChange={(e) => setDni(e.target.value)}
          required
        />

        <label htmlFor="correo">Correo</label>
        <input
          type="email"
          id="correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />

        <label htmlFor="clave">Contraseña</label>
        <input
          type="password"
          id="clave"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
          required
        />

        <label htmlFor="confirmarClave">Confirmar Contraseña</label>
        <input
          type="password"
          id="confirmarClave"
          value={confirmarClave}
          onChange={(e) => setConfirmarClave(e.target.value)}
          required
        />

        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default Register;
