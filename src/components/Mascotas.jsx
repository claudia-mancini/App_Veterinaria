import React, { useCallback, useEffect, useState } from "react";
const Mascotas = () => {
  // Estado para almacenar la lista de mascotas
  const [mascotas, setMascotas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMascotas, setFilteredMascotas] = useState([]);

  const fetchItems = useCallback(async () => {
    try {
      const response = await fetch(
        "https://6491ca382f2c7ee6c2c8e83c.mockapi.io/api/mascotas/mascotas/"
      );
      const data = await response.json();
      setMascotas(data);
      console.log(data);
      setFilteredMascotas(data);
    } catch (error) {
      console.log("Error fetching items:", error);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  useEffect(() => {
    const filteredResults = mascotas.filter((mascota) =>
      mascota.Nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMascotas(filteredResults);
  }, [searchTerm, mascotas]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const EditMascota = async (editedMascota) => {
    const updatedNombre = prompt(
      "Ingresa el nuevo nombre",
      editedMascota.Nombre
    );
    const updatedEspecie = prompt(
      "Ingresa la nueva especie",
      editedMascota.Especie
    );
    const updatedRaza = prompt("Ingresa la nueva raza", editedMascota.Raza);
    const updatedEdad = prompt("ingresa la nueva edad", editedMascota.Edad);
    const updatedPropietario = prompt(
      "ingresa el nuevo propietario",
      editedMascota.Propietario
    );
    const updatedTelefono = prompt(
      "ingresa el nuevo telefono",
      editedMascota.Telefono
    );
    const updatedDireccion = prompt(
      "ingresa la nueva direccion",
      editedMascota.Direccion
    );


    const updatedProximoTurno = prompt(
      "ingresa el proximo turno",
      editedMascota.ProximoTurno
    );

    if (editedMascota) {
      const updatedMascota = {
        ...editedMascota,
        Nombre: updatedNombre,
        Especie: updatedEspecie,
        Raza: updatedRaza,
        Edad: updatedEdad,
        Propietario: updatedPropietario,
        Telefono: updatedTelefono,
        Direccion: updatedDireccion,
        ProximoTurno: updatedProximoTurno,
      };

      try {
        await fetch(
          `https://6491ca382f2c7ee6c2c8e83c.mockapi.io/api/mascotas/mascotas/${editedMascota.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedMascota),
          }
        );

        setMascotas((prevMascota) => {
          const updatedMascotas = prevMascota.map((mascota) => {
            if (mascota.id === editedMascota.id) {
              return updatedMascota;
            }
            return mascota;
          });
          return updatedMascotas;
        });

        alert("El usuario ha sido actualizado correctamente.");
      } catch (error) {
        console.log("Error al editar el usuario:", error);
        alert(
          "Ocurrió un error al editar el usuario. Por favor, inténtalo de nuevo más tarde."
        );
      }
    }
  };

  const DeleteMascota = async (mascotasId) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar este usuario?"
    );

    if (confirmDelete) {
      try {
        await fetch(
          `https://6491ca382f2c7ee6c2c8e83c.mockapi.io/api/mascotas/mascotas/"`,
          {
            method: "DELETE",
          }
        );

        setMascotas((prevMascota) =>
          prevMascota.filter((mascota) => mascota.id !== mascotasId)
        );
        alert("El usuario ha sido eliminado correctamente.");
      } catch (error) {
        console.log("Error al eliminar el usuario:", error);
        alert(
          "Ocurrió un error al eliminar el usuario. Por favor, inténtalo de nuevo más tarde."
        );
      }
    }
  };
  return (
    <div>
      <nav className="navbar mb-4">
        <div className="container-fluid">
          <h2 className="navbar-brand">Listado de Mascotas</h2>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchTerm}
              onChange={handleSearch}
            />
            <button className="btn btn-primary" type="submit">
              Search
            </button>
          </form>
        </div>
      </nav>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {filteredMascotas.map((mascota) => (
          <div className="card" key={mascota.id}>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Nombre: {mascota.Nombre}</li>
              <li className="list-group-item">Especie: {mascota.Especie}</li>
              <li className="list-group-item">Raza: {mascota.Raza}</li>
              <li className="list-group-item">Edad: {mascota.Edad}</li>
              <li className="list-group-item">
                Dueño/a: {mascota.Propietario}
              </li>
              <li className="list-group-item">Telefono: {mascota.Telefono}</li>
              <li className="list-group-item">
                Direccion: {mascota.Direccion}
              </li>
              <li className="list-group-item">
                Proximo turno: {mascota.ProximoTurno}
              </li>
              <li className="list-group-item">
                <img className="img-fluid" src={mascota.Imagen} alt="" />
              </li>
              <li className="list-group-item text-center">
                <button
                  className="btn btn-primary mx-1"
                  onClick={() => EditMascota(mascota)}
                  type="button"
                >
                  Editar
                </button>

                <button
                  className="btn btn-primary mx-1"
                  onClick={() => DeleteMascota(mascota.id)}
                  type="button"
                >
                  Eliminar
                </button>
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mascotas;
