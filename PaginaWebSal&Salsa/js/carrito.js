class Carrito{

    //Añadir el producto al carrito
    comprarProducto(e){
        e.preventDefault();
        if(e.target.classList.contains('agregar-carrito')){
            const producto=e.target.parentElement.parentElement;
            this.leerDatosProducto(producto);
            
        }
    }
    //Leer los datos del div con la informacion del producto
    leerDatosProducto(producto){
        const infoProducto={
            imagen : producto.querySelector('img').src,
            titulo : producto.querySelector('h5').textContent,
            precio : producto.querySelector('.precio').textContent,
            id : producto.querySelector('.agregar-carrito').getAttribute('data-id'),
            cantidad : 1
        }
        let productosLS;
        productosLS=this.obtenerProductoStorage();
        productosLS.forEach(function(productoLS){
            if(productoLS.id===infoProducto.id){
                productosLS=productoLS.id;
            }
         });
         if(productosLS===infoProducto.id){
             alert('Producto ya agregado');
         }else{
            this.insertarCarrito(infoProducto);
         }
    }

    //insertar el elemento en el div del carrito
    insertarCarrito(producto){
        const row=document.createElement('tr');
        row.innerHTML=`
            <td>
                <img src="${producto.imagen}" width=100>
            </td>
            <td>${producto.titulo}</td>
            <td>${producto.precio}</td>
            <td>
                <a href="#" class="borrar-producto fas fa-times-circle" data-id="${producto.id}"></a>
            </td>
        `;
        listaProductos.appendChild(row);
        this.guardarProductoStorage(producto);
    }

    //eliminar el producto mediante un botno a la derecha del producto
    eliminarProducto(e){
        e.preventDefault();
        let producto, productoId;
        if(e.target.classList.contains('borrar-producto')){
            e.target.parentElement.parentElement.remove();
            producto=e.target.parentElement.parentElement;
            productoId=producto.querySelector('a').getAttribute('data-id');
        }
        this.eliminarProductoStorage(productoId);
        this.calcularTotal();
    }

    //eliminar todos los productos que esten dentro del carrito
    vaciarCarrito(e){
        e.preventDefault();
        while(listaProductos.firstChild){
            listaProductos.removeChild(listaProductos.firstChild);
        }
        localStorage.clear();
        return false;
    }

    //guarda los elementos del carrito en el local storage
    guardarProductoStorage(producto){
        let productos;
        productos=this.obtenerProductoStorage();
        productos.push(producto);
        localStorage.setItem('productos', JSON.stringify(productos));
    }

    //obtiene los elementos que esten en el local storage
    obtenerProductoStorage(){
        let productoLS;
        if(localStorage.getItem('productos')==null){
            productoLS=[];
        }else{
            productoLS=JSON.parse(localStorage.getItem('productos'));
        }
        return productoLS;
    }

    /*eliminar productos almacenados en el local storage cuando se de click en el boton de eliminar
        al lado derecho del producto*/
    eliminarProductoStorage(productoId){
        let productosLS;
        productosLS=this.obtenerProductoStorage();
        productosLS.forEach(function(productoLS, index){
            if(productoLS.id===productoId){
                productosLS.splice(index, 1);
            }
        });   
        localStorage.setItem('productos', JSON.stringify(productosLS));
    }

    //leer los datos almacenados en el local storage y cargarlos en el carrito de compras
    leerProductoStorage(){
        let productosLS;
        productosLS=this.obtenerProductoStorage();
        productosLS.forEach(function(producto){
            const row=document.createElement('tr');
            row.innerHTML=`
                <td>
                    <img src="${producto.imagen}" width=100>
                </td>
                <td>${producto.titulo}</td>
                <td>${producto.precio}</td>
                <td>
                    <a href="#" class="borrar-producto fas fa-times-circle" data-id="${producto.id}"></a>
                </td>
            `;
            listaProductos.appendChild(row);
        });      
    }

    leerProductoStorageCompra(){
        let productosLS;
        productosLS=this.obtenerProductoStorage();
        productosLS.forEach(function(producto){
            const row=document.createElement('tr');
            row.innerHTML=`
                <td>
                    <img src="${producto.imagen}" width=100>
                </td>
                <td>${producto.titulo}</td>
                <td>${producto.precio}</td>
                <td>
                    <input type="number" class="form-control cantidad" min="1" value=${producto.cantidad}>
                </td>
                <td>${producto.precio*producto.cantidad}</td>
                <td>
                    <a href="#" class="borrar-producto fas fa-times-circle" data-id="${producto.id}"></a>
                </td>
            `;
            listaCompras.appendChild(row);
        });      
    }

    //Redireccionar al fomrulario de finalizar compra
    procesarPedido(e){
        e.preventDefault();
        if(this.obtenerProductoStorage().length===0){
            alert("No has seleccionado productos");
        }else{
            location.href="compras.html";
        }
    }

    calcularTotal(){
        let productoLS;
        let total=0,subtotal=0,igv=0;
        productoLS=this.obtenerProductoStorage();
        for(let i=0;i<productoLS.length;i++){
            let element=Number(productoLS[i].precio*productoLS[i].cantidad);
            total=total+element;
        }
        
        igv=parseFloat(total*0.19).toFixed(2);
        subtotal=parseFloat(total-igv).toFixed(2);
        document.getElementById('subtotal').innerHTML="$ "+subtotal;
        document.getElementById('igv').innerHTML="$ "+igv;
        document.getElementById('total').innerHTML="$ "+total.toFixed(2);
    }

    /*obtenerEvento(e) {
        e.preventDefault();
        let id, cantidad, producto, productosLS;
        if (e.target.classList.contains('cantidad')) {
            producto = e.target.parentElement.parentElement;
            id = producto.querySelector('a').getAttribute('data-id');
            cantidad = producto.querySelector('input').value;
            let actualizarMontos = document.querySelectorAll('#subtotales');
            productosLS = this.obtenerProductoStorage();
            productosLS.forEach(function (productoLS, index) {
                if (productoLS.id === id) {
                    productoLS.cantidad = cantidad;                    
                    actualizarMontos[index].innerHTML = Number(cantidad * productosLS[index].precio);
                }    
            });
            localStorage.setItem('productos', JSON.stringify(productosLS));
            
        }
        else {
            console.log("click afuera");
        }
    }*/
}
