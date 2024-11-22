import React, {useEffect, useState} from "react"
import {db} from './firebase'
import './crud.css'
import {doc, addDoc, collection, updateDoc, deleteDoc, getDocs} from 'firebase/firestore'

const Crud = () =>{
  const [nombre, setNombre] = useState();
  const [descripcion, setDescripcion] = useState();
  const [precio, setPrecio] = useState();
  const [fetchData, setFetchData] = useState([]);
  const [id, setId] = useState([]);

  // base de datos por referencia
  const dbref = collection(db , 'crud-React');
  // almacenando en la base de datos
  const add = async () => {
    const addata = await addDoc(dbref, {Nombre : nombre, Precio : precio, Descripcion : descripcion}); 
    if(addata){
      alert("Los Datos se Agregaron Correctamente");
      window.location.reload();
    }else{
      alert("Los Datos no se pudieron Agregar, vuelvelo a intentar");
    }
  } 

  // obtencion de la base de datos 
  
  const fetch = async() => {
    const snapshot = await getDocs(dbref);
    const fetchdata = snapshot.docs.map((doc =>({id : doc.id, ...doc.data()})))
    setFetchData(fetchdata);
    console.log(fetchdata);
  }
  
  useEffect(() => {
    fetch()
  }, [])

  // editar la informacion 
  const passData = async(id) =>{
    const matchId = fetchData.find((data) => {
      return data.id === id;
    })
    setNombre(matchId.Nombre)
    setPrecio(matchId.Precio)
    setDescripcion(matchId.Descripcion)
    setId(matchId.id)
  }

  // actualizar la informacion
  const update = async() =>{
    const updateref = doc(dbref, id) 
  try{
    const udpatedata = await updateDoc(updateref, {Nombre: nombre, Precio : precio, Descripcion : descripcion})
      alert('Actualizado correctamente');
      window.location.reload();
    }catch(error){
      alert(error, 'Hubo un problema al actualizar los datos');
    }
  }

  // eliminando datos de la base de datos

  const del = async (id) =>{
    const delref = doc(dbref, id)
    try {
      await deleteDoc(delref); 
      alert('Se borro correctamente la informacion');
      window.location.reload();
    } catch (e) {
      alert(e, 'No se borro la informacion intentelo de nuevo');
    }
  }
  return(
    <>
      <div className='form_container'>
        <h2>Añadir o Actualizar Producto</h2>
        <div className="box">
          <input
            type="text"
            placeholder="Nombre"
            autoComplete="off"
            value = {nombre}
            onChange={(e) => setNombre(e.target.value)}
          />

        </div>
        <div className="box">
          <input
            type="number"
            placeholder="Precio"
            autoComplete="off"
            value = {precio}
            onChange={(e) => setPrecio(e.target.value)}
          />
        </div>
        <div className="box">
          <input
            type="text"
            placeholder="Descripcion"
            autoComplete="off"
            value = {descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>
        <button onClick={add}>Añadir</button>
        <button onClick={update}>Actualizar</button>
      </div>

      <div className="database">
        <h2>Base de Datos CRUD</h2>
        <div className="container">
          {
            fetchData.map((data) => {
              return(
                <>
                <div className="box">
                  <h2>Nombre: {data.Nombre}</h2>
                  <h2>Precio: {data.Precio}</h2>
                  <h2>Descripción: {data.Descripcion}</h2>
                  <button onClick={()=>passData(data.id)}>Actualizar</button>
                  <button onClick={()=>del(data.id)}>Eliminar</button>
                </div>
                </>
              )
            })
          }
        </div>
      </div>
    </>
  )
}
export default Crud
