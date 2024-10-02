const productos = [
  { id: 1, nombre: "Crema Hidratante", precio: 500, img: "assets/crema.jpg" },
  { id: 2, nombre: "Jabón Natural", precio: 300, img: "assets/jabon.jpg" },
  { id: 3, nombre: "Aceite Esencial", precio: 400, img: "assets/aceite.jpg" },
  { id: 4, nombre: "Champú Orgánico", precio: 450, img: "assets/shampoo.jpg" },
  { id: 5, nombre: "Bálsamo Labial", precio: 150, img: "assets/balsamo.jpg" }
];

let carrito = JSON.parse(localStorage.getItem('carrito')) || {};

function renderizarProductos() {
  const contenedorProductos = document.getElementById("productos");

  productos.forEach(producto => {
    const divProducto = document.createElement("div");
    divProducto.classList.add("producto");
    divProducto.innerHTML = `
      <img src="${producto.img}" alt="${producto.nombre}" width="100">
      <h3>${producto.nombre}</h3>
      <p>Precio: $${producto.precio}</p>
      <button onclick="agregarAlCarrito(${producto.id})">Añadir al Carrito</button>
    `;
    contenedorProductos.appendChild(divProducto);
  });
}

function agregarAlCarrito(idProducto) {
  const producto = productos.find(p => p.id === idProducto);
  if (carrito[producto.nombre]) {
    carrito[producto.nombre].cantidad += 1;
  } else {
    carrito[producto.nombre] = { ...producto, cantidad: 1 };
  }
  localStorage.setItem('carrito', JSON.stringify(carrito));
  mostrarCarrito();
}

function mostrarCarrito() {
  const listaCarrito = document.getElementById("lista-carrito");
  const carritoDiv = document.getElementById("carrito");
  listaCarrito.innerHTML = "";

  let total = 0;
  for (let nombreProducto in carrito) {
    const producto = carrito[nombreProducto];
    const li = document.createElement("li");
    li.textContent = `${producto.nombre} x${producto.cantidad} - $${producto.precio * producto.cantidad}`;
    listaCarrito.appendChild(li);
    total += producto.precio * producto.cantidad;
  }

  document.getElementById("total").textContent = `Total a pagar: $${total}`;
  carritoDiv.style.display = "block";
}

function finalizarCompra() {
  const resumenDiv = document.getElementById("resumen-compra");
  const listaResumen = document.getElementById("detalle-compra");
  const totalFinal = document.getElementById("total-final");

  listaResumen.innerHTML = ""; 
  let total = 0;

  for (let nombreProducto in carrito) {
    const producto = carrito[nombreProducto];
    const li = document.createElement("li");
    li.textContent = `${producto.nombre} x${producto.cantidad} - $${producto.precio * producto.cantidad}`;
    listaResumen.appendChild(li);
    total += producto.precio * producto.cantidad;
  }

  totalFinal.textContent = `Total final: $${total}`;
  resumenDiv.style.display = "block"; 
}

document.getElementById("finalizar-compra").addEventListener("click", () => {
  finalizarCompra();
  localStorage.clear();
  carrito = {};
  mostrarCarrito();
});


renderizarProductos();
mostrarCarrito();
