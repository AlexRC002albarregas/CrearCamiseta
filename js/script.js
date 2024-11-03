let imgElements = document.querySelectorAll('.draggable');
let imgPecho = document.getElementById('img-pecho');
let camisetaImagen = document.getElementById('camiseta-imagen');
let imagenGrande = document.getElementById('imagenGrande');
let tituloInput = document.getElementById('titulo');
let errorSpan = document.getElementById('error');
let textoTitulo = document.getElementById('textoTitulo');
let nombreImagen = document.getElementById('nombreImagen');

imgElements.forEach(img => {
    img.addEventListener('dragstart', function (e) {
        e.dataTransfer.setData('text/plain', e.target.src);
    });
});

// Añadir un evento dragstart a la camiseta para evitar que se arrastre
camisetaImagen.addEventListener('dragstart', function (e) {
    e.preventDefault(); // Evitar que la camiseta se pueda arrastrar
});

function soltarImagen(e) {
    e.preventDefault();
    let imgSrc = e.dataTransfer.getData('text/plain');

    // Comprobar que no se está arrastrando la camiseta sobre sí misma
    if (imgSrc === camisetaImagen.src) {
        return;
    }

    imgPecho.src = imgSrc;
    imgPecho.style.width = '70px';
    imgPecho.style.height = '60px';
    imgPecho.style.marginTop = '200px';
    imgPecho.style.marginLeft = '100px';
    imgPecho.style.transform = 'scaleX(-1)';

    imagenGrande.innerHTML = '';

    let img = document.createElement('img');
    img.src = imgSrc;
    img.style.width = '180px';
    img.style.height = 'auto';
    img.style.marginTop = '100px';
    img.alt = 'Imagen central';
    img.className = 'img-fluid';
    imagenGrande.appendChild(img);

    // Obtener el nombre de la imagen y mostrarlo
    let imgName = imgSrc.split('/').pop().split('.')[0];
    nombreImagen.textContent = imgName;
}

document.querySelector('.camiseta').addEventListener('dragover', function (e) {
    e.preventDefault();
});

document.querySelector('.camiseta').addEventListener('drop', soltarImagen);

camisetaImagen.addEventListener('dragover', function (e) {
    e.preventDefault();
});

camisetaImagen.addEventListener('drop', soltarImagen);

// Actualizar el texto del título
tituloInput.addEventListener('input', function () {
    // Muestra 'Título' si el input está vacío
    textoTitulo.textContent = tituloInput.value || 'Título';
});

// Mover el título con los sliders de posX y posY
let posX = document.getElementById('posX');
let posY = document.getElementById('posY');

posX.addEventListener('input', function () {
    textoTitulo.style.transform = `translate(${posX.value}px, ${posY.value}px)`;
});

posY.addEventListener('input', function () {
    textoTitulo.style.transform = `translate(${posX.value}px, ${posY.value}px)`;
});

let colorInputs = document.querySelectorAll('input[name="color"]');
colorInputs.forEach(input => {
    input.addEventListener('change', function () {
        camisetaImagen.src = this.value === 'white' ? 'img/camiseta/white.png' : 'img/camiseta/black.png';
    });
});
