import React, { useState, useEffect } from "react";
import ButtonCataComponente from "../components/provider/Button/Button";
import TitleCataComponente from "../components/provider/Title/Title";
import InputCataComponente from "../components/provider/Input/Input";
import TabletCataComponente from "../components/provider/Table/Table";
import PaginateCataComponente from "../components/provider/Paginate/Paginate";
import { SelectCataComponente } from "../components/provider/Select/Select";
import SearchCataComponente from "../components/provider/Search/Search";

const Colors = () => {
  const [forms, setForm] = useState([]);
  const [news, setNews] = useState({
    //IdColor
    Descripcion: "",
  });
  const [selected, setSelected] = useState(null);
  const [deleted, setDeleted] = useState(false);
  const [deletedM, setDeletedM] = useState(false);
  const [options, setOptions] = useState([]);
  const [currentPage, setCurrentPage] = useState([]);
  const [filter, setFilter] = useState("");

  const PerPage = 20;
  const form = "Colors";

  const URL = "http://localhost:";
  const PORT = "3003";

  useEffect(() => {
    handleGet();
  }, [selected]);

  useEffect(() => {
    handleGet();
    setDeleted(false);
  }, [deleted]);

  useEffect(() => {
    handleGet();
    setDeletedM(false);
  }, [deletedM]);

  const handleGet = async () => {
    try {
      const response = await fetch(`${URL}${PORT}/${form}`);
      const data = await response.json();
      setForm(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${URL}${PORT}/${form}/${id}`, {
        method: "DELETE",
      });
      console.log(response);
      setForm((prev) => prev.filter((info) => info.IdColor != id));
      setDeleted(true);
      if (selected && selected.IdColor == id) {
        setSelected(null);
        setNews({
          IdColor: "",
          Descripcion: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteM = async (ids) => {
    try {
      const response = await fetch(`${URL}${PORT}/${form}/delete/all`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ids),
      });
      console.log(response);
      setDeletedM(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (news) => {
    setSelected(news);
    setNews({
      IdColor: news.IdColor,
      Descripcion: news.Descripcion,
    });
  };

  const handleCreate = async () => {
    try {

      const isDuplicate = forms.some(
        (item) => item.Descripcion === news.Descripcion
      );

      if (isDuplicate) {
        alert("¡El color ya está creado!");
        window.location.reload();
        return;
      }
  
      if (!news.Descripcion.trim()) {
        alert("¡Por favor, ingresa una COLOR!");
        window.location.reload();
        return;
      }
  
      const response = await fetch(`${URL}${PORT}/${form}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(news),
      });
  
      const data = await response.json();
      setForm((prev) => [...prev, data]);
      setNews({
        IdColor: "",
        Descripcion: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputSearch = (e) => {
    const { name, value } = e.target;
    setNews((prev) => ({ ...prev, [name]: value }));
    if (name === "filter") {
      setFilter(value);
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setNews((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelect = (e) => {
    const { name, value } = e.target;
    setNews((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    const response = await fetch(`${URL}${PORT}/${form}/${selected.IdColor}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        IdColor: news.IdColor,
        Descripcion: news.Descripcion,
      }),
    });
    const data = await response.json();
    setForm((prev) =>
      prev.map((estado) => (estado.IdColor == data.IdColor ? data : estado))
    );
    setSelected(null);
    setNews({
      IdColor: "",
      Descripcion: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      handleUpdate();
    } catch (error) {
      console.error("Error al actualizar:", error);
    }

    try {
      handleCreate();
    } catch (error) {
      console.error("Error al crear:", error);
    }
  };

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage);
    setFilter("");
  };

  const indexOfLast = (currentPage + 1) * PerPage;
  const indexOfFirst = indexOfLast - PerPage;
  const current = forms
    .filter((item) =>
      item.Descripcion.toString()
        .toLowerCase()
        .includes(filter.toString().toLowerCase())
    )
    .slice(indexOfFirst, indexOfLast);

  return (
    <>
      <div className="container mt-4">
        <div className="row">
          <div className="col">
            <TitleCataComponente title="colores" size="h6" />
            <SearchCataComponente
              value={filter}
              onChange={handleInputSearch}
              type={"search"}
              name={"filter"}
              id={"filter"}
              placeholder={"Filtrar por color"} //no es necesario
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
            <form onSubmit={handleSubmit} className="mb-4">
              <div className="form-row">
                <InputCataComponente
                  value={news.Descripcion}
                  onChange={handleInput}
                  placeholder={"Ingrese descripcion"}
                  id={"Descripcion"}
                  type={"text"}
                  name={"Descripcion"}
                  label={"Descripcion"}
                />

                <ButtonCataComponente
                  type="submit"
                  className="btn btn-primary btn-block"
                  title="Guardar"
                />
              </div>
            </form>
          </div>
          <div className="col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8">
            <TabletCataComponente
              data={current}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              handleDeleteM={handleDeleteM}
              idField={"IdColor"}
              Fields={["Descripcion"]}
            />
            <PaginateCataComponente
              data={forms}
              PerPage={PerPage}
              handlePageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Colors;
