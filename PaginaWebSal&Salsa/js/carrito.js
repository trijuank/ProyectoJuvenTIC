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
            id : producto.querySelector('a').getAttribute('data-id'),
            cantidad : 1
        }
        this.insertarCarrito(infoProducto);
    }

    //insertar el elemento en el div del carrito
    insertarCarrito(producto){
        const row=document.createElement('tr');
        row.innerHTML=`
            <td>
                <img src="${producto.imagen}" width=100>
            </td>
            <td>${producto.titulo}</td>
            <td>${producto.cantidad}</td>
            <td>${producto.precio}</td>
            <td>
                <a href="#" class="borrar-producto fas fa-times-circle" data-id="${producto.id}"></a>
            </td>
        `;
        listaProductos.appendChild(row);
    }

    //eliminar el prodcuto mediante un botno a la derecha del producto
    eliminarProducto(e){
        e.preventDefault();
        let producto, productoId;
        if(e.target.classList.contains('borrar-producto')){
            e.target.parentElement.parentElement.remove();
            producto=e.target.parentElement.parentElement;
            productoId=producto.querySelector('a').getAttribute('data-id');
        }
    }

    //eliminar todos los productos que esten dentro del carrito
    vaciarCarrito(e){
        e.preventDefault();
        while(listaProductos.firstChild){
            listaProductos.removeChild(listaProductos.firstChild);
        }
        return false;
    }
}
