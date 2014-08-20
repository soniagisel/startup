$(document).ready(function() { // Cargamos el DOM

    // Valores iniciales de objetos
    var objArrastrado, objContenedor = null;

    // Eventos para el objeto arrastrable
    var objetos = $('#dragarea').find('.box_msg');
    [].forEach.call(objetos, function(e) {
        e.addEventListener('dragstart', dragStart, false);
        e.addEventListener('dragend', dragEnd, false);
    });

    // Eventos para el panel dragarea
    var dragarea = $('#dragarea');
    [].forEach.call(dragarea, function(e) {
        e.addEventListener('dragenter', dragEnter, false);
        e.addEventListener('dragover', dragOver, false);
        e.addEventListener('drop', dragDrop, false);
        e.addEventListener('dragleave', dragLeave, false);
    });

    // Eventos para el panel drop
    var drops = $('#drop');
    [].forEach.call(drops, function(e) {
        e.addEventListener('dragenter', dragEnter, false);
        e.addEventListener('dragover', dragOver, false);
        e.addEventListener('drop', dragDrop, false);
        e.addEventListener('dragleave', dragLeave, false);
    });

    // Mostramos incialmente la etiqueta en el contenedor drop
    //$("#drop").append('<p>DRAG&DROP</p>');
    
    /* El objeto 'comienza' a ser arrastrado */
    function dragStart(e) {

        // Guardamos el objeto que es arrastrado
        objArrastrado = this;
        
        // Establecemos la operacion que se va a poder realizar
        e.dataTransfer.effectAllowed = 'move';
        // Establecemos el dato y su tipo
        e.dataTransfer.setData('Data', this);
        // Centramos el objeto al cogerlo en las coord. x e y
        e.dataTransfer.setDragImage(this, 50, 50);

        // Resaltamos el objeto arrastrado
        //$(objArrastrado).css('border', '2px dashed');

        // Creamos un elemento 'img' para aÃ±adir una imagen fantasma
        //var dragIcon = document.createElement('img');
        //dragIcon.src = "http://pilas.readthedocs.org/en/latest/_images/explosion.png";
        //dragIcon.width = 10;
        //e.dataTransfer.setDragImage(dragIcon, 35, 35);

    }

    /* Estamos 'entrando' en el area donde se puede dejar un objeto arrastrable */
    function dragEnter(e) {

        // Ocultamos el objeto que se queda estatico
        $(objArrastrado).css('visibility', 'hidden');

        // Cambiamos el contorno y fondo del contenedor
        $(this).css({
            'background-color': 'rgba(255, 251, 242, 0.5)',
            'border-style': 'dashed'
        });

    }

    /* Situados 'encima' del area donde se puede dejar un objeto arrastrable */
    function dragOver(e) {

        // Obtenemos el valor objeto del contenedor sobre el que se posa el objeto arrastrable
        objContenedor = this;

        // El cursor del navegador indica el tipo de operaciÃ³n que se va a realizar
        e.dataTransfer.dropEffect = 'move';

        // Necesario para dejar caer el objeto arrastrado
        if(e.preventDefault)
            e.preventDefault();

        // Ocultamos el texto DROG&DROP
        $("#dragarea p").hide();
        $("#drop p").hide();

    }

    /* Estamos 'soltando' un objeto arrastrable */
    function dragDrop(e) {

        // Agregamos el objeto 'arrastrable' en el contenedor actual
        $(this).append(objArrastrado);

        // Necesario para evitar el redireccionamiento de navegadores
        if(e.stopPropagation)
            e.stopPropagation();

        // Restauramos el contorno del objeto y el color de fondo del contenedor
        $(this).css({
            'background-color': '',
            'border-style': 'solid'
        });

    }

    /* Estamos 'saliendo' del area donde se puede dejar un objeto arrastrable */
    function dragLeave(e) {

        // Cambiamos el fondo del objeto contenedor
        $(this).css({
            'background-color': '',
            'border-style': 'solid'
        });

    }

    /* El objeto 'termina' de ser arrastrado */
    function dragEnd(e) {

        // Si no hay elemento en el contenedor mostramos el texto
        if($("#drop div").length === 0)
            $("#drop").append('<p id="drop_info">Drop messages here</p>');

        // Si no hay elemento en el contenedor mostramos el texto
        if($("#dragarea div").length === 0)
            $("#dragarea").append('<p class="msg-appear">Messages will appear here</p>');

        /* Reseteamos valores modificados para inicializarlos */
        $(this).css({
            'background-color': '',
            'border-style': 'solid'
        });

        // Mostramos el objeto arrastrado previamente ocultado
        $(objArrastrado).css('visibility', 'visible');

    }

});


/**
*
*   Text Files
*
*/
window.onload = function() {
    var dropZoneTwo = document.querySelector('#dd-files');
    var fileContentPane = document.querySelector('#file-content');

    // Event Listener for when the dragged file is over the drop zone.
    dropZoneTwo.addEventListener('dragover', function(e) {
        if (e.preventDefault) e.preventDefault(); 
        if (e.stopPropagation) e.stopPropagation(); 

        e.dataTransfer.dropEffect = 'copy';
    });

    // Event Listener for when the dragged file enters the drop zone.
    dropZoneTwo.addEventListener('dragenter', function(e) {
        this.className = "over";
    });

    // Event Listener for when the dragged file leaves the drop zone.
    dropZoneTwo.addEventListener('dragleave', function(e) {
        this.className = "";
    });

    // Event Listener for when the dragged file dropped in the drop zone.
    dropZoneTwo.addEventListener('drop', function(e) {
        if (e.preventDefault) e.preventDefault(); 
        if (e.stopPropagation) e.stopPropagation(); 

        this.className = "";

        var fileList = e.dataTransfer.files;

        if (fileList.length > 0) {
            readTextFile(fileList[0]);
        }
    });


    // Read the contents of a file.
    function readTextFile(file) {
        var reader = new FileReader();

        reader.onloadend = function(e) {
            if (e.target.readyState == FileReader.DONE) {
                var content = reader.result;
                fileContentPane.innerHTML = "File: " + file.name + "\n\n" + content;
            }
        }
        
    reader.readAsBinaryString(file);
    }
    
};