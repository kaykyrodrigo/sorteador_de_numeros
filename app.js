function sortear() {
    // Verifica se os campos estão válidos
    if (!validarCampos()) {
        return; // Impede o sorteio se a validação falhar
    }

    // Declarando as variaveis dos campos input
    let quantidade = parseInt(document.getElementById("quantidade").value);
    let de = parseInt(document.getElementById("de").value);
    let ate = parseInt(document.getElementById("ate").value);

    let sorteados = [];
    let numero;
    
    // Loop do sorteio
    for (let i = 0; i < quantidade; i++) {
        numero = obterNumeroAleatorio(de, ate);

        while (sorteados.includes(numero)) {
            numero = obterNumeroAleatorio(de, ate); 
        }

        sorteados.push(numero);    
    }

    // Ordenar os números sorteados em ordem crescente
    sorteados.sort((a, b) => a - b);

    // Resultado <p>
    let resultado = document.getElementById("resultado");
    resultado.innerHTML = `<label class="texto__paragrafo">Números sorteados: ${sorteados.join(", ")} </label>` 
    alterarStautsBotaoReiniciar();
}

// Gerador de número aleatorio
function obterNumeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Função para validar os campos
function validarCampos() {
    let quantidade = document.getElementById("quantidade").value;
    let de = document.getElementById("de").value;
    let ate = document.getElementById("ate").value;
    let resultado = document.getElementById("resultado"); // Elemento onde o resultado será exibido

    // Limpa o conteúdo anterior do resultado
    resultado.innerHTML = "";

    // Validação dos campos input, se estiverem vazios
    if (quantidade === "" || de === "" || ate === "") {
        resultado.innerHTML = '<label class="texto__paragrafo">Por favor, preencha todos os campos!</label>';
        return false;
    }

    // Validação adicional: garantir que 'de' seja menor que 'até' e 'quantidade' seja positiva
    if (parseInt(de) >= parseInt(ate)) {
        resultado.innerHTML = '<label class="texto__paragrafo">O valor "De" deve ser menor que "Até".</label>';
        return false;
    }

    if (parseInt(quantidade) <= 0) {
        resultado.innerHTML = '<label class="texto__paragrafo">A quantidade de números sorteados deve ser maior que 0.</label>';
        return false;
    }

    return true; // Todos os campos estão válidos
}

// Função para alterar o status do botão reiniciar
function alterarStautsBotaoReiniciar() {
    let botao = document.getElementById("btn-reiniciar");
    
    if (botao.classList.contains("container__botao-desabilitado")) {
        botao.classList.remove("container__botao-desabilitado");
        botao.classList.add("container__botao");
    } else {
        botao.classList.remove("container__botao");
        botao.classList.add("container__botao-desabilitado");
    }
}

// Função para reiniciar os campos e o status
function reiniciar() {
    document.getElementById("quantidade").value = "";
    document.getElementById("de").value = "";
    document.getElementById("ate").value = "";
    document.getElementById("resultado").innerHTML = '<label class="texto__paragrafo">Números sorteados: nenhum até agora</label>';
    alterarStautsBotaoReiniciar();
}
