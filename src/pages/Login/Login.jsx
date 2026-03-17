// src/pages/Login/Login.jsx
import React, { useState } from 'react';
import styles from './Login.module.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../services/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';

const Login = () => {
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, correo, clave);
      const user = userCredential.user;

      // Obtener el rol del usuario desde Firestore
      const userDoc = await getDoc(doc(db, "usuarios", user.uid));
      if (userDoc.exists()) {
        const userRole = userDoc.data().role;

        // Redirigir según el rol del usuario
        if (userRole === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/home");
        }
      } else {
        setMensaje("⚠️ Usuario sin perfil registrado en Firestore.");
      }
    } catch (error) {
      setMensaje('❌ Usuario no encontrado o clave incorrecta');
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Iniciar Sesión</h2>

        <input
          type="email"
          placeholder="Correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
          required
        />

        <button type="submit">Ingresar</button>
        <button type="button" className={styles.registerBtn} onClick={() => navigate('/register')}>Registrarse</button>

        {mensaje && <p className={styles.mensaje}>{mensaje}</p>}
      </form>
    </div>
  );
};

export default Login;
