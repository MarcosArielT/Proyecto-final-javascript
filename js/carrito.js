// carrito.js - Clase Carrito
class Carrito {
  constructor(){
    this.items = JSON.parse(localStorage.getItem('carrito')) || [];
  }
  agregar(producto){
    const existe = this.items.find(i=> i.id===producto.id);
    if(existe){
      existe.cantidad++;
    } else {
      this.items.push({...producto, cantidad:1});
    }
    this._guardar();
  }
  quitar(id){
    this.items = this.items.filter(i=> i.id!==id);
    this._guardar();
  }
  vaciar(){
    this.items = [];
    this._guardar();
  }
  total(){
    return this.items.reduce((acc,i)=> acc + i.precio * i.cantidad, 0);
  }
  _guardar(){
    localStorage.setItem('carrito', JSON.stringify(this.items));
    const contador = document.getElementById('contadorCarrito');
    if(contador) contador.textContent = this.items.reduce((a,b)=> a + b.cantidad, 0);
  }
}
