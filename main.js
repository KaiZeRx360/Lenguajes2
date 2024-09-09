const esExpresionValida = (expresion) => {
    const regex = /^[0-9+\-*/()\s]+$/;
    const noEmpiezaConNegativo = !/^[-]/.test(expresion);
    return regex.test(expresion) && noEmpiezaConNegativo;
};

const generarArbol = () => {
    const expresionInput = document.getElementById('expresion').value.trim();
    const contenedorArbol = document.getElementById('arbol');

    if (!esExpresionValida(expresionInput)) {
        contenedorArbol.innerHTML = '<p class="error">La expresión no es válida. Solo se permiten números, operadores y paréntesis.</p>';
        return;
    }

    try {
        const arbolHtml = construirArbolDeExpresion(expresionInput);
        contenedorArbol.innerHTML = arbolHtml;
    } catch (error) {
        contenedorArbol.innerHTML = '<p class="error">Error al generar el árbol.</p>';
        console.error(error);
    }
};

const construirArbolDeExpresion = (expresion) => {
    const expresionSanitizada = expresion
        .replace(/[^0-9+\-*/()]/g, '') 
        .replace(/\s+/g, ''); 
    
    return crearNodo(expresionSanitizada); 
};

const crearNodo = (expresion) => {
    if (!expresion.includes('+') && !expresion.includes('-') && !expresion.includes('*') && !expresion.includes('/')) {
        return `<div class="nodo-arbol"><div class="contenido-nodo">${expresion}</div></div>`;
    }

    let indiceOperador = encontrarIndiceOperador(expresion);

    if (indiceOperador === -1) {
      
        const expresionSinParentesis = expresion.substring(1, expresion.length - 1);
        return crearNodo(expresionSinParentesis);
    }

    let operador = expresion[indiceOperador];
    let izquierda = expresion.substring(0, indiceOperador); 
    let derecha = expresion.substring(indiceOperador + 1); 

    return `
        <div class="nodo-arbol">
            <div class="contenido-nodo">${operador}</div>
            <div class="hijos">
                ${crearNodo(izquierda)}
                ${crearNodo(derecha)}
            </div>
        </div>
    `;
};

const encontrarIndiceOperador = (expresion) => {
    const operadores = ['+', '-', '*', '/'];
    let nivelParentesis = 0;

 
    for (let i = expresion.length - 1; i >= 0; i--) {
        const char = expresion[i];

        
        if (char === ')') nivelParentesis++;
        if (char === '(') nivelParentesis--;

        
        if (nivelParentesis === 0 && operadores.includes(char)) {
            return i;
        }
    }

   
    return -1;
};