// Variables para las fracciones y control de intentos
let numerator1, numerator2, denominator1, denominator2, operation, lcm, attempts;

function startExercise() {
    // Generar fracciones aleatorias
    numerator1 = Math.floor(Math.random() * 10) + 1;
    numerator2 = Math.floor(Math.random() * 10) + 1;
    denominator1 = Math.floor(Math.random() * 10) + 1;
    denominator2 = Math.floor(Math.random() * 10) + 1;

    // Determinar operación
    operation = Math.random() > 0.5 ? '+' : '-';

    // Inicializar intentos
    attempts = 3;

    // Mostrar las fracciones iniciales
    const fractionDisplay = document.getElementById('fraction-display');
    fractionDisplay.innerHTML = `
        <div class="fraction-container">
            <div class="fraction">
                <span>${numerator1}</span>
                <span>─</span>
                <span>${denominator1}</span>
            </div>
            <div class="operation">
                <span>${operation}</span>
            </div>
            <div class="fraction">
                <span>${numerator2}</span>
                <span>─</span>
                <span>${denominator2}</span>
            </div>
        </div>
    `;

    // Restablecer la pregunta inicial
    document.getElementById('current-question').innerHTML = '¿Cuál es el mínimo común múltiplo (MCM) de los denominadores?';

    // Restaurar el input para el MCM
    document.getElementById('input-container').innerHTML = `
        <input type="number" id="user-input" placeholder="Ingresa el MCM">
        <button onclick="checkAnswer()">Verificar</button>
    `;

    // Limpiar mensajes de retroalimentación
    document.getElementById('feedback').innerHTML = '';
    document.getElementById('homogeneous-display').innerHTML = '';

    // Calcular el MCM
    lcm = calculateLCM(denominator1, denominator2);
}

function calculateLCM(a, b) {
    let max = Math.max(a, b);
    while (true) {
        if (max % a === 0 && max % b === 0) return max;
        max++;
    }
}

function checkAnswer() {
    const userAnswer = parseInt(document.getElementById('user-input').value);
    const feedback = document.getElementById('feedback');
    const fractionDisplay = document.getElementById('fraction-display');
    const question = document.getElementById('current-question');
    const inputContainer = document.getElementById('input-container');

    if (userAnswer === lcm) {
        feedback.innerHTML = '¡Correcto!';
        feedback.style.color = '#28a745';

        // Mostrar fracciones homogéneas y mantener el formato anterior
        fractionDisplay.innerHTML = `
            <div class="fraction-container">
                <div class="fraction">
                    <span>( )</span>
                    <span>─</span>
                    <span>( )</span>
                </div>
                <div class="fraction">
                    <span>${numerator1}</span>
                    <span>─</span>
                    <span>${denominator1}</span>
                </div>
                <div class="operation">
                    <span>${operation}</span>
                </div>
                <div class="fraction">
                    <span>${numerator2}</span>
                    <span>─</span>
                    <span>${denominator2}</span>
                </div>
                <div class="fraction">
                    <span>( )</span>
                    <span>─</span>
                    <span>( )</span>
                </div>
            </div>
            <div class="operation">
                <span>=</span>
            </div>
            <div class="fraction-container">
                <div class="fraction">
                    <span>( )</span>
                    <span>─</span>
                    <span>${lcm}</span>
                </div>
                <div class="operation">
                    <span>${operation}</span>
                </div>
                <div class="fraction">
                    <span>( )</span>
                    <span>─</span>
                    <span>${lcm}</span>
                </div>
            </div>
        `;

        // Cambiar la pregunta
        question.innerHTML = '¿Cuál es el factor que se debe multiplicar en el numerador y denominador de la primera fracción para igualar el denominador al MCM?';

        // Cambiar la entrada para el factor
        inputContainer.innerHTML = `
            <input type="number" id="factor-input" placeholder="Ingresa el factor">
            <button onclick="checkFirstFractionFactor()">Verificar</button>
        `;
    } else {
        attempts--;
        if (attempts > 0) {
            feedback.innerHTML = `Incorrecto. Te quedan ${attempts} intentos.`;
            feedback.style.color = '#dc3545';
        } else {
            feedback.innerHTML = `Incorrecto. El MCM correcto era ${lcm}. Inicia una nueva operación.`;
            feedback.style.color = '#dc3545';
            document.getElementById('user-input').disabled = true; // Deshabilitar entrada
        }
    }
}

function checkFirstFractionFactor() {
    const factor = parseInt(document.getElementById('factor-input').value);
    const expectedFactor = lcm / denominator1;
    const feedback = document.getElementById('feedback');

    if (factor === expectedFactor) {
        const numeratorFactor = document.querySelector('#fraction-display .fraction-container:nth-child(1) .fraction span:nth-child(1)');
        const denominatorFactor = document.querySelector('#fraction-display .fraction-container:nth-child(1) .fraction span:nth-child(3)');

        numeratorFactor.innerHTML = `(${factor})`;
        denominatorFactor.innerHTML = `(${factor})`;

        feedback.innerHTML = '¡Correcto! El factor se ha aplicado correctamente.';
        feedback.style.color = '#28a745';

        // Cambiar a la pregunta sobre la segunda fracción
        document.getElementById('current-question').innerHTML = '¿Cuál es el factor que se debe multiplicar en el numerador y denominador de la segunda fracción para igualar el denominador al MCM?';

        // Cambiar la entrada para el segundo factor
        document.getElementById('input-container').innerHTML = `
            <input type="number" id="second-factor-input" placeholder="Ingresa el factor">
            <button onclick="checkSecondFractionFactor()">Verificar</button>
        `;
    } else {
        feedback.innerHTML = 'Incorrecto. Revisa el valor ingresado.';
        feedback.style.color = '#dc3545';
    }
}

function checkSecondFractionFactor() {
    const factor = parseInt(document.getElementById('second-factor-input').value);
    const expectedFactor = lcm / denominator2;
    const feedback = document.getElementById('feedback');

    if (factor === expectedFactor) {
        const numeratorFactor = document.querySelector('#fraction-display .fraction-container:nth-child(1) .fraction:nth-child(5) span:nth-child(1)');
        const denominatorFactor = document.querySelector('#fraction-display .fraction-container:nth-child(1) .fraction:nth-child(5) span:nth-child(3)');

        numeratorFactor.innerHTML = `(${factor})`;
        denominatorFactor.innerHTML = `(${factor})`;

        feedback.innerHTML = '¡Correcto! El factor se ha aplicado correctamente a la segunda fracción.';
        feedback.style.color = '#28a745';

        // Cambiar a la pregunta sobre la multiplicación del numerador de la primera fracción
        document.getElementById('current-question').innerHTML = '¿Cuál es el resultado de multiplicar el numerador de la primera fracción por su factor correspondiente?';

        // Cambiar la entrada para el resultado del numerador
        document.getElementById('input-container').innerHTML = `
            <input type="number" id="first-numerator-result" placeholder="Ingresa el resultado">
            <button onclick="checkFirstNumeratorResult()">Verificar</button>
        `;
    } else {
        feedback.innerHTML = 'Incorrecto. Revisa el valor ingresado.';
        feedback.style.color = '#dc3545';
    }
}

function checkFirstNumeratorResult() {
    const userResult = parseInt(document.getElementById('first-numerator-result').value);
    const factor = lcm / denominator1; // Factor para la primera fracción
    const expectedResult = numerator1 * factor; // Resultado esperado de la multiplicación
    const feedback = document.getElementById('feedback');

    if (userResult === expectedResult) {
        feedback.innerHTML = '¡Correcto! El resultado se ha aplicado al numerador de la primera fracción.';
        feedback.style.color = '#28a745';

        // Seleccionar dinámicamente el paréntesis del numerador en la fracción al lado derecho
        const resultNumerator = document.querySelector('#fraction-display .fraction-container:nth-child(3) .fraction:nth-child(1) span:nth-child(1)');
        resultNumerator.innerHTML = `(${userResult})`; // Colocar el resultado dentro del paréntesis

        // Cambiar a la pregunta sobre la multiplicación del numerador de la primera fracción
        document.getElementById('current-question').innerHTML = '¿Cuál es el resultado de multiplicar el numerador de la segunda fracción por su factor correspondiente?';

        // Cambiar la entrada para el resultado del numerador
        document.getElementById('input-container').innerHTML = `
            <input type="number" id="second-numerator-result" placeholder="Ingresa el resultado">
            <button onclick="checkSecondNumeratorResult()">Verificar</button>
        `;
    } else {
        feedback.innerHTML = 'Incorrecto. Revisa el valor ingresado.';
        feedback.style.color = '#dc3545';
    }
}

function checkSecondNumeratorResult() {
    const userResult = parseInt(document.getElementById('second-numerator-result').value);
    const factor = lcm / denominator2; // Factor para la segunda fracción
    const expectedResult = numerator2 * factor; // Resultado esperado de la multiplicación
    const feedback = document.getElementById('feedback');

    if (userResult === expectedResult) {
        feedback.innerHTML = '¡Correcto! El resultado se ha aplicado al numerador de la segunda fracción.';
        feedback.style.color = '#28a745';

        // Reflejar el resultado en el paréntesis del numerador de la segunda fracción al lado derecho
        const resultNumerator = document.querySelector('#fraction-display .fraction-container:nth-child(3) .fraction:nth-child(3) span:nth-child(1)');
        resultNumerator.innerHTML = `(${userResult})`; // Colocar el resultado dentro del paréntesis

        // Modificar el contenido de fractionDisplay para incluir el nuevo conjunto de fracciones
        const fractionDisplay = document.getElementById('fraction-display');
        const term1 = numerator1 * (lcm / denominator1); // Primer término en el numerador combinado
        const term2 = numerator2 * (lcm / denominator2); // Segundo término en el numerador combinado
        const combinedNumerator = `${term1} ${operation} ${term2}`;

        fractionDisplay.innerHTML += `
            <div class="operation">
                <span>=</span>
            </div>
            <div class="fraction-container">
                <div class="fraction long">
                    <span class="numerator">${combinedNumerator}</span>
                    <span>────</span>
                    <span class="denominator">${lcm}</span>
                </div>
            </div>
            <div class="operation">
                <span>=</span>
            </div>
            <div class="fraction-container">
                <div class="fraction">
                    <span>( )</span>
                    <span>──</span>
                    <span>${lcm}</span>
                </div>
            </div>
        `;

        // Cambiar la pregunta para la suma o resta de los términos
        document.getElementById('current-question').innerHTML =
            `¿Cuál es el resultado de la ${operation === '+' ? 'suma' : 'resta'} de los términos en el numerador?`;

        // Cambiar la entrada para el resultado de la operación
        document.getElementById('input-container').innerHTML = `
            <input type="number" id="combined-numerator-result" placeholder="Ingresa el resultado">
            <button onclick="checkCombinedNumeratorResult(${term1}, ${term2}, '${operation}')">Verificar</button>
        `;
    } else {
        feedback.innerHTML = 'Incorrecto. Revisa el valor ingresado.';
        feedback.style.color = '#dc3545';
    }
}

function checkCombinedNumeratorResult(term1, term2, operation) {
    const userResult = parseInt(document.getElementById('combined-numerator-result').value);
    const feedback = document.getElementById('feedback');

    // Calcular el resultado esperado basado en la operación
    const expectedResult = operation === '+' ? term1 + term2 : term1 - term2;

    if (userResult === expectedResult) {
        // Eliminar la pregunta y el input
        document.getElementById('current-question').innerHTML = '';
        document.getElementById('input-container').innerHTML = '';

        // Mostrar retroalimentación final
        feedback.innerHTML = '¡Correcto! Usted ha operado de manera exitosa ambas fracciones.';
        feedback.style.color = '#28a745';

        // Reflejar el resultado en el numerador final
        const finalNumerator = document.querySelector('#fraction-display .fraction-container:nth-child(7) .fraction span:nth-child(1)');
        finalNumerator.innerHTML = `${userResult}`; // Colocar el resultado final dentro del paréntesis
    } else {
        feedback.innerHTML = 'Incorrecto. Revisa el valor ingresado.';
        feedback.style.color = '#dc3545';
    }
}

// Iniciar el ejercicio al cargar la página
window.onload = startExercise;