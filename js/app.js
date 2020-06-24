var vet_numero = [];
var valor = [];
var listar_numeros = document.getElementById("outNumeros");
listar_numeros.textContent = "\n";
var listar_sorteados = document.getElementById("outSorteados");
listar_sorteados.textContent = "\n";
var quantidade = "";
var valor_premio = "";

function habilitarCampo() {
  var hab = document.getElementById("gerar_input").value;
  var quant = document.getElementById("quant_apostas");
  quant_apostas.disabled = false;
}

function desabilitarCampo() {
  var desab = document.getElementById("gerar_aleatorio").value;
  var quant = document.getElementById("quant_apostas");
  quant_apostas.value = "";
  quant_apostas.disabled = true;

}

function desabilitarTodos() {
  var hab = document.getElementById("gerar_input").value;
  var desab = document.getElementById("gerar_aleatorio").value;
  var quant = document.getElementById("quant_apostas");
  quant_apostas.disabled = true;
  gerar_aleatorio.disabled = true;
  gerar_input.disabled = true;
}

function addValorPremio() {
  valor_premio = document.getElementById("valorpremio").value;
  if (valor_premio < 3.50) {
    alert("Valor do prêmio deve ser maior do que R$ 3,50 !!!");
  } else {
    valorpremio.disabled = true;
  }
}

var btAddValorPremio = document.getElementById("btAddValorPremio");
btAddValorPremio.addEventListener("click", addValorPremio);

function enviar() {
  if (valor_premio != "") {
    var aleatorio = document.getElementById("gerar_aleatorio").checked;
    quantidade = document.getElementById("quant_apostas").value;
    if (aleatorio == true) {
      quantidade = 6;
      gerar6Aleatorios();
      listarNumeros();
      gerarAleatorio();
      listarSorteados();
      var acertos = 0;
      for (let i = 0; i < 6; i++) {
        if (vet_numero[i] == valor[i]) {
          acertos++;
        } else {
          return;
        }
      }
      if (acertos == quantidade) {
        alert("Você ganhou!!!")
      } else {
        alert("Não foi dessa vez...")
      }
      console.log("Aleatorio");
    } else if (quantidade >= 6 && quantidade <= 15) {
      gerarInputs();
      desabilitarTodos();
      console.log("Gerar inputs");
    } else {
      alert("Digite um numero de 6 a 15!")
      return;
    }
  } else {
    alert("Adicione o valor do prêmio")
  }
}

var btEnviar = document.getElementById("btEnviar");
btEnviar.addEventListener("click", enviar);

function gerarInputs() {
  var parag = "<p>Números que deseja apostar: </p>";
  var inptBtn = "<p><input placeholder='ex: 1 a 60' type='number' id='inputNumeros'></input> <input type='button' value='Adicionar número' id='btAddNumero'></input></p>";
  var inptVrf = "<input type='button' value='Verificar' id='btVerificar'></input>"
  $("#inputs").append(parag, inptBtn);
  $("#botao").append(inptVrf);

  var btAddNumero = document.getElementById("btAddNumero");
  btAddNumero.addEventListener("click", addNumero);

  var btVerificar = document.getElementById("btVerificar");
  btVerificar.addEventListener("click", verificarVencedor);
}

function addNumero() {
  var numero = document.getElementById("inputNumeros").value;

  if (vet_numero.length < quantidade) {
    if (numero >= 1 && numero <= 60) {
      vet_numero.push(numero);
      listarNumeros();
      console.log(vet_numero);
    } else {
      alert("Número inválido!");
    }
  } else {
    alert("Você ja inseriu " + quantidade + " números!");
    return;
  }
}

function listarNumeros() {
  var listar_numeros = "";
  listar_numeros += "\nNúmeros apostados: ";
  for (i = 0; i < vet_numero.length; i++) {
    if (i == 0) {
      listar_numeros += "\n" + vet_numero[i];
    } else if (i == vet_numero.length - 1) {
      listar_numeros += ", " + vet_numero[i] + ".";
    } else {
      listar_numeros += ", " + vet_numero[i];
    }
  }
  document.getElementById("outNumeros").textContent = listar_numeros;
}

function listarSorteados() {
  var listar_sorteados = "";
  listar_sorteados += "\nNúmeros sorteados: ";
  for (i = 0; i < valor.length; i++) {
    if (i == 0) {
      listar_sorteados += "\n" + valor[i];
    } else if (i == valor.length - 1) {
      listar_sorteados += ", " + valor[i] + "."
    } else {
      listar_sorteados += ", " + valor[i];
    }
  }
  document.getElementById("outSorteados").textContent = listar_sorteados;
}

function verificarVencedor() {

  var acertos = 0;
  if (vet_numero.length == quantidade) {
    gerarAleatorio();
    listarSorteados();
    for (let i = 0; i < quantidade; i++) {
      if (vet_numero[i] == valor[i]) {
        acertos++;
      }
    }
  } else {
    alert("Você precisa inserir " + quantidade + " números!");
    return;
  }

  if (acertos == quantidade) {
    alert("Você ganhou!!!")
  } else {
    alert("Não foi dessa vez...")
  }
  console.log(acertos);
}

function gerarAleatorio() {
  for (let i = 0; i < quantidade; i++) {
    let min = Math.ceil(1);
    let max = Math.floor(60);
    valor.push(Math.floor(Math.random() * (max - min)) + min);
  }
  console.log(valor);
}

function gerar6Aleatorios() {
  for (let i = 0; i < 6; i++) {
    let min = Math.ceil(1);
    let max = Math.floor(60);
    vet_numero.push(Math.floor(Math.random() * (max - min)) + min);
  }
  console.log(vet_numero);
}