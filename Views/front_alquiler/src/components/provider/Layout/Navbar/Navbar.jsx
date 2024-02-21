import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';

const NavbarCataComponente = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleNavToggle = () => {
    setIsNavOpen(!isNavOpen);
  };

  const dropdownItems = {
    empleado: [
      { to: '/employe', label: 'Empleado' },
      { to: '/expense/employe', label: 'Gastos del Empleado' },
    ],
    cliente: [

      { to: '/clients', label: 'Clientes' },

    ],
    configuracion: [
      { to: '/accesories', label: 'Accesorios' },
     // { to: '/status/employe', label: 'Estados del Empleado' },
    //  { to: '/categorys', label: 'Categoría' },
      //{ to: '/status/pay', label: 'Estado pago' },
     // { to: '/sizes', label: 'Tallas' },
      //{ to: '/store', label: 'Tienda' },
     // { to: '/colors', label: 'Colores' },
      { to: '/item', label: 'Artículos' },
     // { to: '/status/register/negative', label: 'Estado registro negativo' },
   // { to: '/payment/type', label: 'Tipos de pago' },
     // { to: '/renting', label: 'alquiler' },
     // { to: '/puchase/order', label: 'Orden compra' },
     // { to: '/puchase/accesories/order', label: 'Orden compra accesorios' },
     // { to: '/puchase/item/order', label: 'Orden compra articulo ' },
    //  { to: '/payments', label: 'Pagos' },

    ],
    inventory: [
      { to: '/renting', label: 'Alquiler' },
      { to: '/accesories/inventory', label: 'Inventario de accesorios' },
      { to: '/item/inventory', label: 'Alquileres' },
    ],
    alquiler: [
      { to: '/rental', label: 'Nuevo Alquiler' },
      { to: '/credit', label: 'Abonos' },
      { to: '/puchase/accesories/order', label: 'redimir factuta accesorios' },
      { to: '/puchase/item/order', label: 'redimir factura articulo ' },
      { to: '/renting', label: 'redimir factura fecha' },

    ],
    pagos: [
      { to: '/credit', label: 'pagos' },

    ],
    devoluciones: [
      { to: '/rentalRefund', label: 'Nueva devolución' },
      { to: '/renting', label: 'validacion devoluciones del dia' },
      { to: '/rentalrefurnt', label: 'Devolucion de alquileres' },
      { to: '/negative/record', label: 'califica tu cliente' },
    ],
    reportes: [
      { to: '/reports', label: 'reportes' },
    ],
  //  reportsNegative: [
     // { to: '/reportsNegative', label: 'Consultar negatividad' },
   // ]
  };

  const renderDropdownItems = (items) =>
    items.map((item, index) => (
      <NavDropdown.Item key={index} as={Link} to={item.to}>
        {item.label}
      </NavDropdown.Item>
    ));

  const renderNavDropdowns = () =>
    Object.entries(dropdownItems).map(([title, items]) => (
      <NavDropdown key={title} title={title.charAt(0).toUpperCase() + title.slice(1)} id={`${title}-dropdown`}>
        {renderDropdownItems(items)}
      </NavDropdown>
    ));

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link to={'/'} className="navbar-brand">
          KADMIEL SMOKING
        </Link>
        <button className="navbar-toggler" type="button" onClick={handleNavToggle}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isNavOpen ? 'show' : ''}`} id="navbar-nav">
          <ul className="navbar-nav mr-auto">{renderNavDropdowns()}</ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarCataComponente;
