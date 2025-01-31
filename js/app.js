// Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

// Listeners
registrarEventListeners();
function registrarEventListeners() {

    // Cuando agregas un curso presionando "Agregar al carrito"
    listaCursos.addEventListener( 'click', agregarCurso );

    // Elimina cursos del carrito
    carrito.addEventListener( 'click', eliminarCurso );

    // Vaciar carrito de compras
    vaciarCarritoBtn.addEventListener( 'click', () => {
        articulosCarrito = []; // Reseteó el arreglo del carrito de compras

        limpiarHTML(); // Elimina todo el HTML
    } );
};

// Funciones
function agregarCurso( evento )  {
    evento.preventDefault();

    if( evento.target.classList.contains('agregar-carrito') ) {
        const cursoSeleccionado = evento.target.parentElement.parentElement;
        leerDatosCurso( cursoSeleccionado );
    }
};

// Elimina un curso del carrito
function eliminarCurso( evento ) {
    console.log(evento.target.classList)
    if( evento.target.classList.contains( 'borrar-curso' ) ) {
        const cursoId = evento.target.getAttribute( 'data-id' );

        // Elimina del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId );

        // Itera sobre el carrito de compras y después muestra el HTML
        carritoHTML();
    }
};

// Lee el contenido del HTML al que le dimos click y extrae la información del curso
function leerDatosCurso( curso ) {

    // Se crea un objeto literal con el contenido del curso actual
    const infoCurso = {
        imagen:   curso.querySelector( 'img' ).src,
        titulo:   curso.querySelector( 'h4' ).textContent,
        precio:   curso.querySelector( '.precio span' ).textContent,
        id:       curso.querySelector( 'a' ).getAttribute( 'data-id' ),
        cantidad: 1
    }

    // Revisa si un elemento ya existe dentro del carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id );
    if( existe ) {
        // Actualiza la cantidad de cursos
        const cursosActualizados = articulosCarrito.map( curso => {
            if( curso.id === infoCurso.id ) {
                curso.cantidad++;
                return curso;
            } else {
                return curso;
            }
        } );
        articulosCarrito = [...cursosActualizados]
    } else {
        // Agrega elementos al arreglo carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    carritoHTML();
};

// Muestra el carrito de compras en el HTML
function carritoHTML() {

    // Limpia el HTML
    limpiarHTML();

    //Recorre el carrito y genera el HTML
    articulosCarrito.forEach( curso => {
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement( 'tr' );

        row.innerHTML = `
            <td>
                <img src='${imagen}' width='100'>
            </td>
            <td>${titulo}</td>    
            <td>${precio}</td>    
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}" > X </a>
            </td>
        `;

        // Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild( row );
    });
};

// Elimina los cursos del tbody
function limpiarHTML() {
    
    while( contenedorCarrito.firstChild ) {
        contenedorCarrito.removeChild( contenedorCarrito.firstChild );
    }
};


