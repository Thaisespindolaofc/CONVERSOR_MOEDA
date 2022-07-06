var resultado;

$.ajax({
  type: "GET",
  dataType: "JSON",
  url: "https://economia.awesomeapi.com.br/json/all",
  success: function (data) {
    resultado = data
  },
  error: function (data) {
    alert('Erro! o site não conseguiu carregar os valores atuais da cotação. Tente novamente mais tarde. :(');
  }
});

function converter() {
  var euro = resultado["EUR"]["bid"]
  
 

  function getHorarioAtualizacao(codigoMoeda) {
    var data = (resultado[codigoMoeda]["create_date"])
    //Mudando a formatação da data para DD/MM/AA 
    var dia = data.substring(8, 10)
    var mes = data.substring(5, 7)
    var ano = data.substring(0, 4)
    var hora = data.substring(11, 16)
    var dataFormatada = `${dia}/${mes}/${ano} às ${hora}`
    var atualizacao = document.querySelector("#atualizacao");
    atualizacao.innerHTML = 'Cotação atualizada em ' + dataFormatada;
  }

  var numeroDigitado = document.querySelector("#entrada").value;
  numeroDigitado = parseFloat(numeroDigitado);

  var calculo;

  var saida = document.querySelector("#saida");
  var selecionado = 'EUR'

  function calcular(valorMoeda, codigoMoeda){
    calculo = numeroDigitado / valorMoeda
    calculo = ((calculo*10)/100)+calculo
    calculo = calculo.toLocaleString('en-us', { style: 'currency', currency: codigoMoeda });
    numeroDigitado = numeroDigitado.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
    saida.innerHTML = `Resultado: ${numeroDigitado} + 10% = ${calculo}`
    getHorarioAtualizacao(codigoMoeda)
  }

    if (isNaN(numeroDigitado) == true) {
      alert("Digite um valor!")
    }
    
  
  if (numeroDigitado <= 0) {
    alert("Valor inválido! Digite somente valores positivos e diferentes de zero")
  }

  if (selecionado == "EUR" && !isNaN(numeroDigitado) && !isNaN(euro)) {
      calcular(euro, "EUR")
  }

}