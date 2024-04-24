import { useState, useEffect } from "react";
import { DateTime } from "luxon"; // Importar DateTime de la biblioteca Luxon
import ButtonCataComponente from "../../components/provider/Button/Button";
import InputCataComponente from "../../components/provider/Input/Input";
import { SelectCataComponente } from "../../components/provider/Select/Select";
import { Button } from "react-bootstrap";
import { handleDeleteById } from "../../utils/requests";

const NewPurchaseOrder = ({
  rentalStatus,
  updateActiveKeys,
  updateRentalStatus,
  setIdPurchaseOrder,
}) => {
  const [news, setNews] = useState({
    IdOrdenCompra: "",
    FechaCompra: DateTime.now().setZone('America/Bogota').toISODate(), // Obtener la fecha actual en la zona horaria de Colombia
    IdAlquiler: "",
    IdEmpleado: "",
    Total: 0,
  });
  const [options, setOptions] = useState([]);
  const [purchaseOrders, setPurchaseOrders] = useState(null);

  const nextKeys = ["2", "3", "4"];
  const prevKeys = ["0"];

  const FORM = "PuchaseOrder";
  const URL = "http://localhost:";
  const PORT = "3003";

  useEffect(() => {
    handleGetEmpleado();
    handleGetPurchaseOrders();
  }, []);

  const handleGetEmpleado = async () => {
    try {
      const response = await fetch(`${URL}${PORT}/employe`);
      const data = await response.json();
      const newOptions = data.map((element) => ({
        value: element.IdEmpleado,
        label: element.Nombre + " " + element.Apellido + " - " + element.IdEmpleado,
      }));
      setOptions(newOptions);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetPurchaseOrders = async () => {
    try {
      const response = await fetch(`${URL}${PORT}/${FORM}`);
      const data = await response.json();
      setPurchaseOrders(data);
    } catch (error) {
      console.log(error);
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

  const handleCreate = async () => {
    try {
      const response = await fetch(`${URL}${PORT}/${FORM}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...news, IdAlquiler: rentalStatus.rent.IdAlquiler }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (news.IdOrdenCompra !== "" && purchaseOrders) {
      if (purchaseOrders.find((order) => order.IdOrdenCompra === parseInt(news.IdOrdenCompra))) {
        alert("La orden de compra seleccionada ya está asignada a un alquiler.");
        return null;
      }
    }
    try {
      const data = await handleCreate();
      if (data) {
        updateRentalStatus({ purchaseOrder: data });
        updateActiveKeys(nextKeys);
        setIdPurchaseOrder(data.IdOrdenCompra);
      }
    } catch (error) {
      console.error("Error al crear:", error);
    }
  };

  const handleReturnToRent = async () => {
    await handleDeleteById(rentalStatus.rent.IdAlquiler, "renting");
    updateActiveKeys(prevKeys);
  };

  return (
    <>
      <div className="container mt-4">
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
            <form onSubmit={handleSubmit} className="mb-4">
              <div className="form-row">
                <InputCataComponente
                  value={news.FechaCompra}
                  onChange={handleInput}
                  placeholder={"Ingrese FechaCompra"}
                  id={"FechaCompra"}
                  type={"date"}
                  name={"FechaCompra"}
                  label={"FechaCompra"}
                />
                <SelectCataComponente
                  required
                  label={"- Seleccionar empleado -"}
                  name={"IdEmpleado"}
                  value={news.IdEmpleado}
                  options={options}
                  onChange={handleSelect}
                />
               
                <ButtonCataComponente
                  type="submit"
                  className="btn btn-primary btn-block"
                  title="Guardar"
                />
                <Button variant="warning" onClick={handleReturnToRent}>Regresar</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewPurchaseOrder;
