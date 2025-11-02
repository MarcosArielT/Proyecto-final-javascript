// productos.js - carga de bebidas desde data/bebidas.json
async function cargarProductos(){
  try{
    const res = await fetch('data/bebidas.json');
    const productos = await res.json();
    return productos;
  } catch(err){
    console.error('Error cargando productos', err);
    return [];
  }
}
