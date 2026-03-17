import React, { useEffect, useState } from "react";
import { db } from "../../services/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import styles from "./AdminDashboard.module.css";

const AdminDashboard = () => {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    const fetchEventos = async () => {
      const querySnapshot = await getDocs(collection(db, "eventos"));
      const eventosData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setEventos(eventosData);
    };

    fetchEventos();
  }, []);

  return (
    <div className={styles.container}>
      <h2>Eventos Registrados</h2>
      <table className={styles.eventTable}>
        <thead>
          <tr>
            <th>Nombre del Evento</th>
            <th>Detalles</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {eventos.map(evento => (
            <tr key={evento.id}>
              <td>{evento.nombre}</td>
              <td>{JSON.stringify(evento.datos)}</td>
              <td>{new Date(evento.timestamp.seconds * 1000).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
