// ENDPOINTS 

GET PRODUCTOS
http://localhost:7777/productos

GET PEDIDOS
http://localhost:7777/pedidos

GET BY ID PEDIDOS
http://localhost:7777/pedidos/(id)

POST PEDIDOS

http://localhost:7777/pedidos

Body:

{
  "nombreUsuario": "Daniel",  // Cambiar al probar
  "productosIds": [1,2,3,4,5] // Cambiar al probar
}

PUT BY ID PEDIDOS

http://localhost:7777/pedidos/(id)

Body:

{
  "nombreUsuario": "Juan", // Cambiar al probar
  "productosIds": [2, 3, 4] // Cambiar al probar
}

DELETE BY ID PEDIDOS

http://localhost:7777/pedidos/(id)




