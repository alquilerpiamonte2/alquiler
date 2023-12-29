import React, { useState } from "react";
import ButtonCataComponente from "../Button/Button";
import ImagenCataComponente from "../Imagen/Imagen";
import { Link } from "react-router-dom";
import InvoicePreview from "../../../views/Invoice/InvoicePreview";

const TabletCataComponente = ({
  data,
  handleDelete,
  handleEdit,
  idField,
  Fields,
  handleDeleteM,
  generateInvoice,
}) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [invoiceModalActive, setInvoiceModalActive] = useState(false)
  const [idSelected, setIdSelected] = useState(null)

  const handleItemSelect = (itemId) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id != itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const handleDeleteSelected = () => {
    handleDeleteM(selectedItems);
    setSelectedItems([]);
  };

  //format datos
  const handleGetOneEmpleado = async (IdEmpleado) => {
    const response = await fetch(`${URL}${PORT}/puchaseOrder/${IdEmpleado}`);
    const data = await response.json();
    return data.message.Nombre + " " + data.message.Apellido;
  };

  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectedItems.length == data.length}
                onChange={() => {
                  if (selectedItems.length == data.length) {
                    setSelectedItems([]);
                  } else {
                    setSelectedItems(data.map((provider) => provider[idField]));
                  }
                }}
              />
            </th>
            {Fields.map((e, key) => (
              <th key={key}>{e}</th>
            ))}
            <th style={{ width: "100%" }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((provider, id) => (

            <tr key={id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedItems.includes(provider[idField])}
                  onChange={() => handleItemSelect(provider[idField])}
                />
              </td>
              {Fields.map((e, index) => (
                <td key={index}>
                  {e === "IdEstadoEmpleado" ? (
                    provider[e] === 1 ? (
                      <p style={{ backgroundColor: "green", color: "white" }}>
                        Activo
                      </p>
                    ) : provider[e] === 2 ? (
                      <p style={{ backgroundColor: "red", color: "white" }}>
                        Inactivo
                      </p>
                    ) : e === "IdOrdenCompra" ? (
                      handleGetOneEmpleado(provider[e])
                    ) : (
                      provider[e]
                    )
                  ) : e === "FotoDocumento" || e === "FotoServicioPublico" ? (
                    provider[e] ? (
                      <ImagenCataComponente name={provider[e].replace('.jpg', '')}></ImagenCataComponente>
                    ) : null
                  ) : (
                    provider[e]
                  )}
                </td>
              ))}

              <td>
                <button
                  type="button"
                  className="btn btn-warning btn-sm"
                  onClick={() => handleEdit(provider)}
                >
                  update
                </button>
                &nbsp;
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(provider[idField])}
                >
                  Delete
                </button>
                &nbsp;
                {idField == "IdOrdenCompra" && (
                  <ButtonCataComponente
                    title={"Generar factura"}
                    type={"button"}
                    onClick={() => {
                      setIdSelected(provider[idField])
                      setInvoiceModalActive(!invoiceModalActive)
                    }}
                  ></ButtonCataComponente>
                )}
              </td>
            </tr>


          ))}
        </tbody>
      </table>
      {selectedItems.length > 0 && (
        <div>
          <button
            type="button"
            className="btn btn-danger btn-sm"
            onClick={handleDeleteSelected}
          >
            Delete Multiple
          </button>
        </div>
      )}
      <InvoicePreview
        id={idSelected}
        invoiceModalActive={invoiceModalActive}
        setInvoiceModalActive={setInvoiceModalActive}
      />
    </div>
  );
};

export default TabletCataComponente;
