const router = require('express').Router();
const ClientsController = require('../Controllers/clients.controller');

//traer informacion
router.get('/', ClientsController.FindAllClients)

// por seguridad se recomienda post -> crear.
router.post('/', ClientsController.CreateClients)

//put actualiza todo, ejemplo si tienes [nombre: 'alex', edad: '26'] -> peticion [nombre: 'catalina'] bd [nombre: 'catalina', edad: '']
//patch el solo actualiza lo que ud le diga.
router.patch('/:IdCliente', ClientsController.UpdateClients)

router.delete('/:IdCliente', ClientsController.DeleteClients)

router.post('/delete/all', ClientsController.DeleteMultipleClients)

router.get('/:IdCliente', ClientsController.FindOneClientsById)

module.exports = router