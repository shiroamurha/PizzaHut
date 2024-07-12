
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



function formatCPF(value) {
    
    value = value.replace(/\D/g, '');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

    return value;
}
document.getElementById('cpf').addEventListener('input', function (event) {
    let input = event.target;
    input.value = formatCPF(input.value);
});
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

    cpf = cpf.replace(/[^\d]+/g, '');

    let add = 0;
    for (let i = 0; i < 9; i++) {
        add += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) {
        rev = 0;
    }
    if (rev !== parseInt(cpf.charAt(9))) {
        return false;
    }

    add = 0;
    for (let i = 0; i < 10; i++) {
        add += parseInt(cpf.charAt(i)) * (11 - i);
    }
    rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) {
        rev = 0;
    }
    if (rev !== parseInt(cpf.charAt(10))) {
        return false;
    }

    return true;
}

document.getElementById('form').addEventListener('submit', function(event) {
    const cpfInput = document.getElementById('cpf');
    const cpfError = document.getElementById('cpfError');
    if (!validarCPF(cpfInput.value)) {
        cpfError.style.display = 'block';
        alert("CPF inválido. Por favor, insira um CPF válido.");
        event.preventDefault();

    } else {
        cpfError.style.display = 'none';
    }
});

document.getElementById('cpf').addEventListener('input', function() {
    const cpfError = document.getElementById('cpfError');
    cpfError.style.display = 'none';
});



function consultanome(){
    event.preventDefault();
    const nome = document.getElementById('nome').value.trim();

    if (nome) {
        const ibge_coisa = `https://servicodados.ibge.gov.br/api/v2/censos/nomes/${nome}`;
        const xhr = new XMLHttpRequest();

        xhr.open("GET", ibge_coisa, true);

        xhr.onload = function() {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                displayResult(data);
            } else {
                displayError('Erro na consulta à API');
            }
        };

        xhr.onerror = function() {
            displayError('Erro de rede');
        };

        xhr.send();
    }
};

function displayResult(data) {
    const resultDiv = document.getElementById('frequencia-nome');
    resultDiv.innerHTML = '';

    if (data.length === 0) {
        resultDiv.innerHTML = 'Nenhuma ocorrência encontrada.';
        return;
    }

    const nameData = data[0];
    const frequencies = nameData.res;
    const totalOccurrences = frequencies.reduce((sum, freq) => sum + freq.frequencia, 0);

    resultDiv.innerHTML = `Ocorrência total: ${totalOccurrences}`;
}

function displayError(message) {
    const resultDiv = document.getElementById('frequencia-nome');
    resultDiv.innerHTML = `${message}`;
}