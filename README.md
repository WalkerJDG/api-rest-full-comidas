// ENDPOINTS 

GET PRODUCTOS
https://api-rest-full-comidas.onrender.com/productos

GET PEDIDOS
https://api-rest-full-comidas.onrender.com/pedidos


GET BY ID PEDIDOS
https://api-rest-full-comidas.onrender.com/productos/(id)


POST PEDIDOS

https://api-rest-full-comidas.onrender.com/pedidos


Body:

{
  "nombreUsuario": "Daniel",  // Cambiar al probar
  "productosIds": [1,2,3,4,5] // Cambiar al probar
}

PUT BY ID PEDIDOS

https://api-rest-full-comidas.onrender.com/pedidos/(id)


Body:

{
  "nombreUsuario": "Juan", // Cambiar al probar
  "productosIds": [2, 3, 4] // Cambiar al probar
}

DELETE BY ID PEDIDOS

https://api-rest-full-comidas.onrender.com/pedidos/(id)




