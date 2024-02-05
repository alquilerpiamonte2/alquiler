async function syncModels() {
  const database = require("./db");

  const Employe = require("./Models/employe.model.js")
  const ExpensesEmploye = require("./Models/expensesEmploye.model");
  const Clients = require("./Models/clients.model");
  const Store = require("./Models/store.model");
  const statusRenting = require("./Models/statusRenting.model.js");
  const RentingClientsStore = require("./Models/renting.model");
  const PuchaseOrderEmployeRenting = require("./Models/purchase_order.model");
  const Accesories = require("./Models/accesories.model");
  const AccesoriesInventoryAccesories = require("./Models/accesoriesInventory.model.js");
  const Item = require("./Models/item.model");
  const ItemInventoryItem = require("./Models/itemInventory.model.js");
  const PuchaseAccesoriesOrderAccesoriesPuchaseOrder = require("./Models/purchase_accesories_order.model");
  const PuchaseItemOrderPuchaseOrderItem = require("./Models/puchase_item_order.model");
  const Colors = require("./Models/colors.model");
  const Sizes = require("./Models/sizes.models");
  const Categorys = require("./Models/categorys.model");
  const ItemColorsSizesCategorysItemInventory = require("./Models/item.model");
  const StatusPay = require("./Models/status_pay.model");
  const PaymentType = require("./Models/payment_type.model");
  const PaymentStatusPayPucherOrderPaymentType = require("./Models/payments.models");
  const PuchaseOrder = require("./Models/purchase_order.model");
  const StatusRegisterNegative = require("./Models/status_register_negative.model.js");
  const ClientsStatusRegisterNegativeNegativeRecord = require("./Models/negativeRecord.model.js");
  const Renting = require("./Models/renting.model.js");
  const StatusEmployeEmploye = require("./Models/employe_status.model.js");
  const RentingRefunt = require("./Models/rental_refunt.model.js");


  // TABLA relacional 1:M Eliminación en cascada
  Employe.hasMany(ExpensesEmploye, {
    foreignKey: "IdEmpleado",
    onDelete: "RESTRICT",
  });

  Clients.hasMany(RentingClientsStore, {
    foreignKey: "IdCliente",
    onDelete: "RESTRICT",
  });

  Store.hasMany(RentingClientsStore, {
    foreignKey: "IdTienda",
    onDelete: "RESTRICT",
  });
  statusRenting.hasMany(RentingClientsStore, {
    foreignKey: "IdEstadoAlquiler",
    onDelete: "RESTRICT",
  });



  Employe.hasMany(PuchaseOrderEmployeRenting, {
    foreignKey: "IdEmpleado",
    onDelete: "RESTRICT",
  });
  Renting.hasMany(PuchaseOrderEmployeRenting, {
    foreignKey: "IdAlquiler",
    onDelete: "RESTRICT",
  });

  Accesories.hasMany(AccesoriesInventoryAccesories, {
    foreignKey: "IdAccesorio",
    onDelete: "RESTRICT",
  });

  Item.hasMany(ItemInventoryItem, {
    foreignKey: "IdArticulo",
    onDelete: "RESTRICT",
  });

  Accesories.hasMany(PuchaseAccesoriesOrderAccesoriesPuchaseOrder, {
    foreignKey: "IdAccesorio",
    onDelete: "RESTRICT",
  });
  PuchaseOrder.hasMany(PuchaseAccesoriesOrderAccesoriesPuchaseOrder, {
    foreignKey: "IdOrdenCompra",
    onDelete: "RESTRICT",
  });
  PuchaseOrder.hasMany(PuchaseItemOrderPuchaseOrderItem, {
    foreignKey: "IdOrdenCompra",
    onDelete: "RESTRICT",
  });

  Item.hasMany(PuchaseItemOrderPuchaseOrderItem, {
    foreignKey: "IdArticulo",
    onDelete: "RESTRICT",
  });

  Colors.hasMany(ItemColorsSizesCategorysItemInventory, {
    foreignKey: "IdColor",
    onDelete: "RESTRICT",
  });
  Sizes.hasMany(ItemColorsSizesCategorysItemInventory, {
    foreignKey: "IdTalla",
    onDelete: "RESTRICT",
  });
  Categorys.hasMany(ItemColorsSizesCategorysItemInventory, {
    foreignKey: "IdCategoria",
    onDelete: "RESTRICT",
  });

  StatusPay.hasMany(PaymentStatusPayPucherOrderPaymentType, {
    foreignKey: "IdEstadoPago",
    onDelete: "RESTRICT",
  });

  PuchaseOrder.hasMany(PaymentStatusPayPucherOrderPaymentType, {
    foreignKey: "IdOrdenCompra",
    onDelete: "RESTRICT",
  });

  PaymentType.hasMany(PaymentStatusPayPucherOrderPaymentType, {
    foreignKey: "IdTipoPago",
    onDelete: "RESTRICT",
  });
  Clients.hasMany(ClientsStatusRegisterNegativeNegativeRecord, {
    foreignKey: "IdCliente",
    onDelete: "RESTRICT",
  });
  StatusRegisterNegative.hasMany(ClientsStatusRegisterNegativeNegativeRecord, {
    foreignKey: "IdEstadoRegistroNegativo",
    onDelete: "RESTRICT",
  }
  );
  PuchaseOrder.hasMany(ClientsStatusRegisterNegativeNegativeRecord, {
    foreignKey: "IdOrdenCompra",
    onDelete: "RESTRICT",
  }
  );
  Renting.hasMany(ClientsStatusRegisterNegativeNegativeRecord, {
    foreignKey: "IdAlquiler",
    onDelete: "RESTRICT",
  }
  );

  //tabla relacion de 1:1
  StatusEmployeEmploye.hasOne(Employe, {
    foreignKey: "IdEstadoEmpleado",
    sourceKey: "IdEstadoEmpleado",
  });

  RentingRefunt.belongsTo(Renting, {
    foreignKey: "IdAlquiler",
    onDelete: "RESTRICT",
  });

  RentingRefunt.belongsTo(Employe, {
    foreignKey: "IdEmpleado",
    onDelete: "RESTRICT",
  });


  await database.sync({ alter: true, force: true }); // false prod y true dev
}

module.exports = syncModels;
