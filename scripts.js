function consultarFrequencia() {
    var nome = document.getElementById("nome").value;
    // Simulação da consulta de frequência
    var frequencia = Math.floor(Math.random() * 100) + 1;
    document.getElementById("frequencia-nome").innerText = `O nome "${nome}" tem uma frequência de ${frequencia} registros.`;
}
function del_item(){
    selected_items = [
        document.getElementById('ex1'), 
        document.getElementById('ex2'), 
        document.getElementById('ex3'),
        document.getElementById('ex4'),
        document.getElementById('ex5'),
        document.getElementById('ex6')
    ];
    selected_items.forEach(
        (item) => {
            if (item != null){
                if (item.checked){
                    item.parentElement.parentElement.remove();
                }
            }
        }
    );
    
}

document.getElementById('cpf').addEventListener('input', function (event) {
    let input = event.target;
    input.value = formatCPF(input.value);
});

function formatCPF(value) {
    
    value = value.replace(/\D/g, '');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

    return value;
}
document.getElementById('nasc').addEventListener('input', function (event) {
    let input = event.target;
    input.value = formatBDate(input.value);
});

function formatBDate(value) {
    
    value = value.replace(/\D/g, '');
    value = value.replace(/(\d{2})(\d)/, '$1/$2');
    value = value.replace(/(\d{2})(\d)/, '$1/$2');

    return value;
}

function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]/g, ''); // Remove caracteres não numéricos

    // Verifica se todos os dígitos são iguais
    if (cpf.length !== 11 || cpf.split('').every(c => c === cpf[0])) {
        return false;
    }

    // Calcula os dígitos verificadores
    for (var t = 9; t < 11; t++) {
        var sum = 0, factor = t + 1;
        for (var i = 0; i < t; i++) {
            sum += parseInt(cpf[i]) * --factor;
        }
        var checkDigit = (sum * 10) % 11;
        if (checkDigit === 10 || checkDigit === 11) {
            checkDigit = 0;
        }
        if (checkDigit !== parseInt(cpf[t])) {
            return false;
        }
    }
    return true;
}

document.getElementById('cpf').addEventListener('submit', function(event) {
    var cpfInput = document.getElementById('cpf');
    var cpfError = document.getElementById('cpfError');
    var cpfValue = cpfInput.value;

    if (!validarCPF(cpfValue)) {
        cpfError.style.display = 'block';
        event.preventDefault(); // Impede o envio do formulário
    } else {
        cpfError.style.display = 'none';
    }
});