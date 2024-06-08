import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';

import { getData } from './firebase';
import './style.css';

const App = () => {
  // 1 creo un estado para mostrar la lista
  const [pets, setPets] = useState([]);

  useEffect(() => {
    // useEffect no puede asincronico

    // 2 PIDO LOS DATOS (truco: usar async/await)
    const getPets = async () => {
      // 3 obtener colleccion
      const petCollection = collection(getData(), 'pets');

      // 4 obtener Snapshot (foto de la lista en ese momento)
      const petSnapshot = await getDocs(petCollection);

      // 5 obtener datos en forma de json con data()
      const petList = petSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // 6 setear el estado con la lista
      console.log(petList);
      setPets(petList);
    };
    // segunda parte del truco ejecutar la funcion asincronica
    getPets();

    // array vacio, se ejecuta cuando se monta <app />
  }, []);

  useEffect(() => {
    // useEffect no puede asincronico

    // 2 PIDO LOS DATOS (truco: usar async/await)
    const getCats = async () => {
      // 3 obtener colleccion
      const petCollection = collection(getData(), 'pets');
      // creo la query para filtrar
      const catQuery = query(petCollection, where('animal', '==', 'gato'));
      try {
        const petSnapshot = await getDocs(catQuery);

        // 5 obtener datos en forma de json con data()
        const catList = petSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        // 6 setear el estado con la lista
        console.log({ catList });
      } catch (e) {
        console.log(e);
      }
    };
    // segunda parte del truco ejecutar la funcion asincronica
    getCats();

    // array vacio, se ejecuta cuando se monta <app />
  }, []);

  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <p>Start editing to see some magic happen :)</p>
      {pets.map(petItem => (
        <p>
          Nombre: {petItem.name} (Edad: {petItem.age}, Tipo: {petItem.animal})
        </p>
      ))}
    </div>
  );
};

export default App;
