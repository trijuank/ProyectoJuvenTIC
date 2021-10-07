const compra=new Carrito();
const listaCompras=document.querySelector('#lista-compra tbody');
const carrito=document.getElementById('tabla-compra');
const procesarCompraBtn=document.getElementById('procesar-compra');
const seguirCompraBtn=document.getElementById('seguir-compra');
const cliente=document.getElementById('destinatario');
const correo=document.getElementById('email');

cargarEventos();

function cargarEventos(){

    document.addEventListener('DOMContentLoaded',compra.leerProductoStorageCompra());
    carrito.addEventListener('click',(e)=>{compra.eliminarProducto(e)});
    compra.calcularTotal();
    procesarCompraBtn.addEventListener('click',procesarCompra);
    /*carrito.addEventListener('change', (e) => { compra.obtenerEvento(e) });
    carrito.addEventListener('keyup', (e) => { compra.obtenerEvento(e) });*/

}

function procesarCompra(e){
    e.preventDefault();
    if(compra.obtenerProductoStorage().length===0){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No hay productos seleccionados',
            showConfirmButton: false,
            timer: 3000
        }).then(function () {
            window.location = "menu.html";
        })
    
    }else if(cliente.value==='' || correo.value===''){
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Ingrese todos los datos del formulario',
            showConfirmButton: false,
            timer: 3000
        })

    }else{

        (function() {
            emailjs.init('user_tDmlx544itPbHC4bBNkbN');
            })();

        const serviceID = 'default_service';
        const templateID = 'template_hlq6jnd';

        function sendmail(){
        var tempParams={
            destinatario:cliente.value,
            email:correo.value,
            content:carrito,
        };

        const cargandoGif=document.querySelector('#cargando');
        cargandoGif.style.display='block';

        const enviado=document.createElement('img');
        enviado.src='img/mail.gif';
        enviado.style.display='block';
        enviado.width='150';

        procesarCompraBtn.style.display='none';
        seguirCompraBtn.style.display='none';
        
        emailjs.send(serviceID, templateID, tempParams)
            .then(()=>{
                cargandoGif.style.display='none';
                document.querySelector('#loaders').appendChild(enviado);
                setTimeout(()=>{
                    enviado.remove();
                    localStorage.clear();
                    procesarCompraBtn.style.display='block';
                    seguirCompraBtn.style.display='block';
                    window.location="menu.html";
                },4000);
            }, (err) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: JSON.stringify(err),
                    showConfirmButton: false,
                    timer: 3000
                })

            });
        }

        sendmail();
    
        
        
    }
}

