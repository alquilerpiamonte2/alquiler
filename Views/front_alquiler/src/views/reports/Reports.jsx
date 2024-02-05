import { useEffect, useState } from "react";
import ButtonCataComponente from "../../components/provider/Button/Button"
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import * as XLSX from 'xlsx'
import DailyReport from "./DailyReport";
// import ReportPreview from "./report/ReportPreview";
// import XLSXPopulate from "xlsx-populate";

const subsidies_balances = async () => {
  const FORM = "payments";
  const URL = "http://localhost:";
  const PORT = "3003";
  try {
    const response = await fetch(`${URL}${PORT}/${FORM}/abonos_saldos`);
    const data = await response.json();
  } catch (error) {
    console.log(error);
  }
}

const spent = async () => {
  const FORM = "expense_employe";
  const URL = "http://localhost:";
  const PORT = "3003";
  try {
    const response = await fetch(`${URL}${PORT}/${FORM}/gastos_empleados`);
    const data = await response.json();
  } catch (error) {
    console.log(error);
  }
}

const getReportData = async () => {
  const FORM = "report";
  const URL = "http://localhost:";
  const PORT = "3003";
  try {
    const response = await fetch(`${URL}${PORT}/${FORM}`);
    const data = await response.json();
    return data
  } catch (error) {
    console.log(error);
  }
}

const getReportDataWeek = async (formData) => {
  const FORM = "report/week";
  const URL = "http://localhost:";
  const PORT = "3003";
  try {
    const response = await fetch(`${URL}${PORT}/${FORM}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    const data = await response.json();
    return data
  } catch (error) {
    console.log(error);
  }
}

function formatearFecha(fecha) {
  const fechaFormateada = new Date(fecha).toLocaleDateString('es-CO', { timeZone: 'UTC' })
  return `${fechaFormateada} `;
}

const createReport = async (data, reportType) => {
  const libro = XLSX.utils.book_new();
  const hojaDia = XLSX.utils.json_to_sheet(data.dia.map(row => ({
    ...row,
  })));

  // Agregar el resultado de SALDO_TOTAL a la hoja de ABONOS
  const hojaAbonos = XLSX.utils.json_to_sheet([
    ...data.abonos.map(row => ({
      ...row,

    })),
  ]);

  // Crea una hoja de Excel con los resultados de 'SALDOS'
  const hojaSaldos = XLSX.utils.json_to_sheet(data.saldos.map(row => ({
    ...row,

  })));

  // Crea una hoja de Excel con los resultados de 'GASTOS'
  const hojaGastos = XLSX.utils.json_to_sheet(data.gastos.map(row => ({
    // Omitir la propiedad createdAt en el objeto resultante
    ...((({ createdAt, ...rest }) => rest)(row)),
  })));


  XLSX.utils.book_append_sheet(libro, hojaDia, 'DIA');
  XLSX.utils.book_append_sheet(libro, hojaAbonos, 'ABONOS');
  XLSX.utils.book_append_sheet(libro, hojaGastos, 'GASTOS');
  XLSX.utils.book_append_sheet(libro, hojaSaldos, 'SALDOS');

  //if (reportType === 'semanal') {
  // Crear una nueva hoja 'CUENTAS SEMANA' con el resultado de SALDO_TOTAL y ABONO_TOTAL
  const hojaCuentasSemanaNueva = XLSX.utils.json_to_sheet([
    {
      ABONO: data.abonoTotal[0].ABONO_TOTAL,
      SALDO: data.saldoTotal[0].SALDO_TOTAL,
      SUMA: data.granTotal[0].SUMA_GENERAL,
      GASTOS: data.gastoTotal[0].TOTAL_GASTOS_SEMANA,
      TOTAL: data.diferenciaTotal[0].TOTAL,
      //xx: data.cuentasSemana[0].NEQUI

    }, // Agrega SALDO_TOTAL y ABONO_TOTAL como nuevas columnas
    // Puedes agregar más transformaciones si es necesario
    ...data.cuentasSemana.map(row => ({
      ...row,
      // Puedes agregar más transformaciones si es necesario
    }
    )),
  ]);
  XLSX.utils.book_append_sheet(libro, hojaCuentasSemanaNueva, 'CUENTAS SEMANA');
  // }

  XLSX.writeFile(libro, `reporte_${reportType}.xlsx`);
}


const handleReportWeek = async () => {
  const data = await getReportDataWeek()
  createReport(data, "semanal")
}

const initFormData = () => {
  let initialDate = new Date()
  let finalDate = new Date()
  initialDate.setDate(initialDate.getDate() - 7)
  return {
    initialDate: initialDate.toISOString().split('T')[0],
    finalDate: finalDate.toISOString().split('T')[0]
  }
}

const handleOldReport = async () => {
  const data = await getReportData()
  createReport(data, "general")
}


const Reports = () => {
  const [formData, setFormData] = useState(initFormData())

  const handleReport = async (e) => {
    let verifyPassword = prompt("Por favor ingresa la contraseña para generar el reporte:")
    const maskedPassword = "*".repeat(verifyPassword.length);
   
    console.log(verifyPassword)
    if (verifyPassword === "cata2047901*") {
      e.preventDefault()
      const data = await getReportDataWeek(formData)
      createReport(data, "generalSemanal")
    } else {
      alert("¡Contraseña incorrecta!")
    }
  }

  const handleChange = ({ target }) => {
    setFormData((prev) => ({ ...prev, [target.name]: target.value }))
  }

  return (<Container>
    <Row className="text-center mt-3 mb-3"><h3>Reportes</h3></Row>
    <Form onSubmit={handleReport}>
      <Row className="mb-5">
        <Col>
          <Form.Group>
            <Form.Label>Fecha Inicial</Form.Label>
            <Form.Control
              type="date"
              value={formData.initialDate}
              name="initialDate"
              onChange={handleChange} />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Fecha Final</Form.Label>
            <Form.Control
              type="date"
              value={formData.finalDate}
              name="finalDate"
              onChange={handleChange} />
          </Form.Group>
        </Col>
        <Col className="d-flex align-items-end">
          <Button type="submit">Generar Reporte</Button>
        </Col>
      </Row>
    </Form>
    <Row className="text-center mb-3"><h3>Reporte del Día</h3></Row>
    <Row>
      <DailyReport getReportDataWeek={getReportDataWeek} />
    </Row>
  </Container>)
}

export default Reports
