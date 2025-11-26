const express = require("express");
const app = express();
const PORT = 7777;

app.use(express.json());

// Lista de productos

const productos = [
  { id: 1, producto: 'Empanada de Carne', precio: 3.50 },
  { id: 2, producto: 'Arepa de Huevo', precio: 4.25 },
  { id: 3, producto: 'Salchipapa Clásica', precio: 9.80 },
  { id: 4, producto: 'Choriperro Especial', precio: 12.50 },
  { id: 5, producto: 'Aborrajado', precio: 6.00 }
]
// Lista de nombres 

const usuario = [
    { id: 1, nombre:"Daniel", correo:"daniel@gmail.com", telefono: 300 },
    { id: 2, nombre:"Juan", correo:"juan@gmail.com", telefono: 400 }
];

// Lista de pedidos

let pedidos = []

// Función para el calculo de la suma

function calcularTotal(idsProductos) {
    let total = 0;
    idsProductos.forEach(idProd => {
        const producto = productos.find(p => p.id === idProd)
        if (producto) {
            total += producto.precio;
        }
    })
    return total.toFixed(2);
}

// Funcion para obtener lista de productos

function obtenerProductosDetalle(idsProductos) {
    return idsProductos.map(idProd => productos.find(p => p.id === idProd)).filter(Boolean);
}

app.get("/pedidos", (req, res) => { 
    res.status(200).json({
        message: "GET de pedidos realizado con exito",
        data: pedidos
    })
});

app.get("/pedidos/:id", (req, res) => {
    const {id} = req.params;
    const myId = parseInt(id);

    const pedido = pedidos.find(p => p.id === myId);
    if (!pedido) {
        return res.status(404).json({ message: "Pedido o ID no encontrado"})
    }

    res.status(200).json({
        message: "Pedido encontrado",
        data: pedido
    });
});

// Crear pedido para la lista

app.post("/pedidos", (req, res) => {
  const { nombreUsuario, productosIds } = req.body;

  // Validaciones básicas
  if (!nombreUsuario || !Array.isArray(productosIds) || productosIds.length === 0) {
    return res.status(400).json({
      message: "El nombre de usuario y los IDs de productos son obligatorios"
    });
  }


  // Validar que los productos existan
  const productosValidos = productosIds.every(idProd => productos.find(p => p.id === idProd));
  if (!productosValidos) {
    return res.status(400).json({
      message: "Uno o más IDs de productos no existen"
    });
  }

  // Calcular total y crear pedido
  const total = calcularTotal(productosIds);
  const detalleProductos = obtenerProductosDetalle(productosIds);

  const nuevoPedido = {
    id: pedidos.length + 1,
    nombreUsuario,
    productos: detalleProductos,
    total: parseFloat(total)
  };

  pedidos.push(nuevoPedido);

  res.status(201).json({
    message: "Nuevo pedido creado correctamente",
    data: nuevoPedido
  });
});
// actulizar pedido

app.put("/pedidos/:id", (req, res) => {
  const { id } = req.params;
  const { nombreUsuario, productosIds } = req.body;
  const myId = parseInt(id);

  const pedido = pedidos.find(p => p.id === myId);
  if (!pedido) {
    return res.status(404).json({ message: "Pedido no encontrado" });
  }

  if (!nombreUsuario || !Array.isArray(productosIds) || productosIds.length === 0) {
    return res.status(400).json({
      message: "El nombre del usuario y los IDs de productos son obligatorios"
    });
  }

  const productosValidos = productosIds.every(idProd => productos.find(p => p.id === idProd));
  if (!productosValidos) {
    return res.status(400).json({ message: "Uno o más IDs de productos no existen" });
  }

  pedido.nombreUsuario = nombreUsuario;
  pedido.productos = obtenerProductosDetalle(productosIds);
  pedido.total = parseFloat(calcularTotal(productosIds));

  res.status(200).json({
    message: "Pedido actualizado correctamente",
    data: pedido
  });
});

// Eliminar pedido

app.delete("/pedidos/:id", (req, res) => {
  const { id } = req.params;
  const myId = parseInt(id);

  const pedido = pedidos.find(p => p.id === myId);
  if (!pedido) {
    return res.status(404).json({ message: "Pedido no encontrado" });
  }

  pedidos = pedidos.filter(p => p.id !== myId);

  res.status(200).json({
    message: "Pedido eliminado correctamente",
    data: pedido
  });
});

// Endpoint para ver los productos disponibles
app.get("/productos", (req, res) => {
  res.status(200).json({
    message: "Listado de productos disponibles",
    data: productos
  });
});


app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});