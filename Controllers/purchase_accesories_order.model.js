const PuchareAccesoriesOrder = require("../Models/purchase_accesories_order.model");

const CreatePuchareAccesoriesOrder = async (req, res) => {
  const {
    Cantidad,
    IdOrdenCompra,
    IdAccesorio	    
  } = req.body;

  try {
    const PuchareAccesoriesOrderCreate = await  PuchareAccesoriesOrder.create({
        Cantidad,
    IdOrdenCompra,
    IdAccesorio	 
    });
    res.status(200).json(PuchareAccesoriesOrderCreate);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const UpdatePuchareAccesoriesOrder= async (req, res) => {
  const {  IdAccesorioOrdenCompra } = req.params;

  const {
    Cantidad,
    IdOrdenCompra,
    IdAccesorio	 
  } = req.body;

  try {
    const [result] = await PuchareAccesoriesOrder.update(
      {
        Cantidad,
        IdOrdenCompra,
        IdAccesorio	 
      },
      {
        where: {  IdAccesorioOrdenCompra },
      }
    );
    if(result == 0){
        res.status(404).json({ error: "accesorio orden compra no actualizado o encontrado"});
    }else{
        res.status(201).json({ message: "accesorio orden compra"});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const DeletePuchareAccesoriesOrder = async (req, res) => {
  const {  IdAccesorioOrdenCompra } = req.params;
  const result = await PuchareAccesoriesOrder.destroy({where: {  IdAccesorioOrdenCompra } })
  try {
    if(result == 0){
        res.status(404).json({ error: "accesorio orden compra eliminado o encontrado"});
    }else{
        res.status(201).json({ message: "iaccesorio orden compra"});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const DeleteMultiplePuchareAccesoriesOrder = async(req, res) => {
  const  IdAccesorioOrdenCompras = req.body
  const result = await PuchareAccesoriesOrder.destroy({where: {  IdAccesorioOrdenCompra :  IdAccesorioOrdenCompras }})
  try {
    if(result == 0){
        res.status(404).json({ error: "accesorio orden compra no eliminados o encontrados"});
    }else{
        res.status(201).json({ message: "iaccesorio orden compra eliminados"});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const FindOnePuchareAccesoriesOrderById = async (req, res) => {
  const {  IdAccesorioOrdenCompra } = req.params;
  try {
    const result = await PuchareAccesoriesOrder.findOne({ where: {  IdAccesorioOrdenCompra} })
    
    if(result == 0){
        res.status(404).json({ error: "Accesorio_Inventario no encontrado"});
    }else{
        res.status(200).json({ message: result});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const FindAllPuchareAccesoriesOrder = async (req, res) => {
  try {
    const result = await PuchareAccesoriesOrder.findAll();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const all = {
  CreatePuchareAccesoriesOrder,
  UpdatePuchareAccesoriesOrder,
  DeletePuchareAccesoriesOrder,
  DeleteMultiplePuchareAccesoriesOrder,
  FindOnePuchareAccesoriesOrderById ,
  FindAllPuchareAccesoriesOrder
};

module.exports = all;