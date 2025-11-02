// ui.js - funciones de UI
function crearCard(producto){
  const col = document.createElement('div');
  col.className = 'col-sm-6 col-md-4';
  col.innerHTML = `
    <div class="card h-100">
      <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}" onerror="this.src='assets/imgs/placeholder.png'">
      <div class="card-body d-flex flex-column">
        <h5 class="card-title">${producto.nombre}</h5>
        <p class="card-text small">Ingredientes: ${producto.ingredientes.join(', ')}</p>
        <p class="mt-auto"><strong>$${producto.precio}</strong></p>
        <div class="d-grid gap-2">
          <button class="btn btn-primary btnAgregar" data-id="${producto.id}">Agregar al carrito</button>
        </div>
      </div>
    </div>
  `;
  return col;
}

function renderCatalogo(productos){
  const cont = document.getElementById('catalogo');
  cont.innerHTML = '';
  productos.forEach(p=>{
    cont.appendChild(crearCard(p));
  });
}

function renderResumen(carrito){
  const section = document.getElementById('resumenCompra');
  const lista = document.getElementById('listaCompra');
  const totalSpan = document.getElementById('totalFinal');
  if(carrito.items.length === 0){
    section.style.display = 'none';
    return;
  }
  section.style.display = 'block';
  lista.innerHTML = '';
  carrito.items.forEach(it=>{
    const div = document.createElement('div');
    div.className = 'd-flex justify-content-between align-items-center border p-2 mb-2';
    div.innerHTML = `<div><strong>${it.nombre}</strong> x ${it.cantidad}</div>
                     <div>$${it.precio * it.cantidad} <button class="btn btn-sm btn-danger ms-2 btnEliminar" data-id="${it.id}">Eliminar</button></div>`;
    lista.appendChild(div);
  });
  totalSpan.textContent = carrito.total();
}
