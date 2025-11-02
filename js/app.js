// app.js - inicialización y eventos
let productosGlobal = [];
const carrito = new Carrito();

document.addEventListener('DOMContentLoaded', async ()=>{
  productosGlobal = await cargarProductos();
  renderCatalogo(productosGlobal);
  carrito._guardar(); // actualiza contador
  renderResumen(carrito);
});

document.addEventListener('click', (e)=>{
  if(e.target.matches('.btnAgregar')){
    const id = Number(e.target.dataset.id);
    const producto = productosGlobal.find(p=> p.id===id);
    carrito.agregar(producto);
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: `${producto.nombre} agregado al carrito`,
      showConfirmButton: false,
      timer: 1200
    });
    renderResumen(carrito);
  }

  if(e.target.matches('.btnEliminar')){
    const id = Number(e.target.dataset.id);
    carrito.quitar(id);
    renderResumen(carrito);
  }

  if(e.target.id === 'btnVaciar'){
    carrito.vaciar();
    renderResumen(carrito);
  }

  if(e.target.id === 'btnFinalizar'){
    if(carrito.items.length===0){
      Swal.fire('El carrito está vacío', '', 'info');
      return;
    }
    const total = carrito.total();
    Swal.fire({
      title: 'Confirmar compra',
      html: `<p>Total a pagar: <strong>$${total}</strong></p>`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Pagar (simulado)'
    }).then(result=>{
      if(result.isConfirmed){
        const nroPedido = 'PED' + Math.floor(Math.random()*90000+10000);
        carrito.vaciar();
        renderResumen(carrito);
        Swal.fire('Compra finalizada', `Tu número de pedido es <strong>${nroPedido}</strong>`, 'success');
      }
    });
  }

  if(e.target.id === 'btnCarrito'){
    const resumen = document.getElementById('resumenCompra');
    if(resumen){
      window.scrollTo({top: resumen.offsetTop - 20, behavior:'smooth'});
    }
  }

  if(e.target.id === 'btnBuscar'){
    const q = document.getElementById('inputBuscar').value.trim().toLowerCase();
    const filtrados = productosGlobal.filter(p=>{
      return p.nombre.toLowerCase().includes(q) || p.ingredientes.join(' ').toLowerCase().includes(q);
    });
    renderCatalogo(filtrados);
  }
});
