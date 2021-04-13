pontuacao = 0;

function adicionarFoto(url,cartasAntigas){
  return ['<img src="',url,'"></img>'+cartasAntigas,].join('\n');
}

function adicionarBotoesJogo(){
  return ['<button type="button" onclick="pegarCarta()">Pegar Carta</button> <button type="button" onclick="parar()" style="background-color: red">Parar</button>',].join('\n');
}

function adicionarBotaoComecar(){
  return ['<button type="button" onclick="comecar()">Começar Jogo</button>',].join('\n');
}

function comecar(){
    let xhttp = new XMLHttpRequest()
    xhttp.open('GET', 'https://deckofcardsapi.com/api/deck/z3ido5ne0a1n/shuffle/?deck_count=1')
    xhttp.onreadystatechange = () =>{
    if(xhttp.readyState == 4 && xhttp.status == 200){
      pontuacao = 0;
      document.getElementById('botoes').innerHTML = '<div></div>'
      document.getElementById('botoesJogo').innerHTML = adicionarBotoesJogo()
      document.getElementById('cartas').innerHTML = '<div></div>'
      document.getElementById('conteudo').innerHTML = '<h1>Suas Cartas</h1>'
    }
    if(xhttp.readyState == 4 && xhttp.status == 404){
      document.getElementById('conteudo').innerHTML = 'Não foi possível completar sua requisição!'
    }
  }

  xhttp.send()
}

function pegarCarta(){
  let xhttp = new XMLHttpRequest()
  xhttp.open('GET', 'https://deckofcardsapi.com/api/deck/z3ido5ne0a1n/draw/?count=1')
    
  xhttp.onreadystatechange = () =>{
    if(xhttp.readyState == 4 && xhttp.status == 404){
        document.getElementById('conteudo').innerHTML = 'Não foi possível completar sua requisição!'
    }
    if (xhttp.readyState == 4 && xhttp.status == 200) {//sucesso
      data = JSON.parse(xhttp.responseText)
      foto = data.cards[0].image
            
      if(data.cards[0].value == 'KING' || data.cards[0].value == 'QUEEN' || data.cards[0].value == 'JACK'){
        pontuacao += 10 
      }else if(data.cards[0].value == 'ACE'){
        pontuacao += 1
      }else{
        pontuacao += parseInt(data.cards[0].value, 10)
      }

      if(pontuacao != 0){
        var cartasAntigas = document.getElementById("cartas").innerHTML
      }
      document.getElementById('cartas').innerHTML = adicionarFoto(foto,cartasAntigas)
      document.getElementById('conteudo').innerHTML = '<h1>Suas Cartas(Valor:'+pontuacao+')</h1>'
    }
        
  }

    xhttp.send()
}

function parar(){
  let xhttp = new XMLHttpRequest()
  xhttp.open('GET', 'https://deckofcardsapi.com/api/deck/z3ido5ne0a1n/shuffle/?deck_count=1')

  maquina = Math.floor(Math.random() * (23 - 16)) + 16
  resultado = ''

  xhttp.onreadystatechange = () =>{

    //verificar vitoria
    if(pontuacao > maquina && pontuacao <= 21 || pontuacao < maquina && maquina > 21 && pontuacao <= 21){
      resultado = 'Parabens! Você ganhou!'
    }else if(pontuacao < maquina && maquina <= 21 || maquina < pontuacao && pontuacao > 21 && maquina <= 21){
      resultado = 'Triste! Você Perdeu!'
    }else if(maquina > 21 && pontuacao > 21 ){
      resultado = 'Ambos Perderam!'
    }else{
      resultado = 'EMPATE!'
    }

    if(xhttp.readyState == 4 && xhttp.status == 200){
      document.getElementById('conteudo').innerHTML = '<p>Sua pontuação: '+pontuacao.toString()+', Pontuação da Maquina: '+maquina.toString()+'. '+resultado+'<p>'
      document.getElementById('botoesJogo').innerHTML = '<div></div>'
      document.getElementById('botoes').innerHTML = adicionarBotaoComecar()
    }
  }
  xhttp.send()
}