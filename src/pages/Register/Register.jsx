// src/pages/Register/Register.jsx
import React, { useState } from 'react';
import { auth, db } from '../../services/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { validateEmail } from '../../utils/validation';
import styles from './Register.module.css';
import { useNavigate } from 'react-router-dom';
//import emailjs from "emailjs-com";

const Register = () => {
  const [dni, setDni] = useState('');
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const [confirmarClave, setConfirmarClave] = useState('');
  const navigate = useNavigate();
  const [role, setRole] = useState('usuario');

  //   const sendEmail = (email) => {
  //   emailjs.send(
  //     "service_fx672ba",  // ID del servicio
  //     "template_427v95y", // ID de la plantilla
  //     { to_email: email }, 
  //     "1EIiLMMjY3M3GEo98"      // Tu ID de usuario en EmailJS
  //   ).then(() => {
  //     console.log("Correo enviado con éxito!");
  //   }).catch((error) => {
  //     console.error("Error enviando correo: ", error);
  //   });
  // };


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
      await setDoc(doc(db, "usuarios", user.uid), {
        uid: user.uid,
        correo,
        dni,
        role, // Guardar el rol seleccionado
        creado: new Date()
      });


      alert(`Usuario registrado con éxito: ${user.email}`);

      // Limpiar el formulario
      setDni('');
      setCorreo('');
      setClave('');
      setConfirmarClave('');
      navigate('/login');
      //sendEmail(correo);
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
          onChange={(e) => {
            const valor = e.target.value.replace(/\D/g, "");
            setDni(valor)
          }
          }
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
       <br>
       </br>
        <select id="role" className={styles.selectRole} value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value="usuario">Usuario</option>
          <option value="admin">Administrador</option>
        </select>

        <button type="submit">Registrar</button>
        <button type="button" className={styles.backBtn} onClick={() => navigate('/login')}>
          Volver al Login
        </button>

      </form>
    </div>
  );
};

export default Register;
