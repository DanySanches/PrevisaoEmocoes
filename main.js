// inicio 120
//  definimos duas variáveis  e  colocamos seu  valor para  vazio
prediction1 = ""
prediction2 = ""

//  código para inciar a web
Webcam.set({
    width:350,
    height:300,
    imageFormat : 'png',
    //  qualidade da  vizualização da  webcam
    pngQuality:90
  });

  // armazenamos o  id  camera dentro  da variavel camera
camera = document.getElementById("camera");

// a variável camera (que tem a div HTML) dentro de Webcam.attach(). 
// Como resultado, a visualização da webcam será exibida na div HTML, 
//  mas nessa parte a camera não foi acionada nem nenhuma função, 
// quando a  página  for  carregada a  webcam será acionada mediante a  permissão
Webcam.attach('#camera');

      
function takeSnapshot()
{
    // webcam.snap(função predefinida da webcam para tirar foto)
    // data_uri  é utilizda para mostrar o resultado
    Webcam.snap(function(data_uri) {
      // img Estamos dando id para a tag img, para que depois possamos pegar essa
      // imagem e passá-la para o modelo para identificar a imagem capturada
      // no src da tag img, passaremos data_uri. Para que esta imagem seja
      // atualizada com a selfie tirada e exibida na página da web.
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

  console.log('ml5 version:', ml5.version);
  // variavel aonde o modelo  do  teachable vai ficar armazenada
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/J2Ip11PDF/model.json',modelLoaded);

  function modelLoaded() {
    console.log('Model Loaded!');
  }
  
  // função falar
function speak(){
  var synth = window.speechSynthesis;
  speakData1 = "A primeira previsão é " + prediction1;
  speakData2 = "E a segunda previsão é " + prediction2;
  // utterThis: é uma variável na qual armazenaremos o texto convertido em fala.
  // new (palavra-chave, para converter o  conteúdo da  speak1 e speak2 em fala)
  // SpeechSynthesisUtterance: é a função de uma API que irá converter texto em fala.
  var utterThis = new SpeechSynthesisUtterance(speakData1 + speakData2);


// synth: vamos armazenar a API no ponto 2.
// speak(): é uma função pré-definida da API.
// utterThis: tem o valor convertido de texto em fala que queremos que o sistema fale.
  synth.speak(utterThis);
}

// aula 121
  function check()
  {
    // colocamos a img dentro de uma variável
    img = document.getElementById('captured_image');
    // classifier :váriavel aonde nosso modelo  está  armazenado
    // classify é uma função predefinida de ml5.js usada para identificar a imagem capturada
    // usando o modelo e obter os resultados,  temos dois parametros 
    // img(imagem capturada) e gotResult(com o resultado da comparação)
    classifier.classify(img, gotResult);
  }


function gotResult(error, results) {
  if (error) {
    console.error(error);
  } else {
    console.log(results);
    document.getElementById("resultEmotionName").innerHTML = results[0].label;
    document.getElementById("resultEmotionName2").innerHTML = results[1].label;
    prediction1 = results[0].label;
    prediction2 = results[1].label;
    speak();
    if(results[0].label == "feliz")
    {
	    document.getElementById("updateEmoji").innerHTML = "&#128522;";
    }
    if(results[0].label == "triste")
    {
	    document.getElementById("updateEmoji").innerHTML = "&#128532;";
    }
    if(results[0].label == "irritado")
    {
	    document.getElementById("updateEmoji").innerHTML = "&#128548;";
    }

    if(results[1].label == "feliz")
    {
	    document.getElementById("updateEmoji2").innerHTML = "&#128522;";
    }
    if(results[1].label == "triste")
    {
	    document.getElementById("updateEmoji2").innerHTML = "&#128532;";
    }
    if(results[1].label == "irritado")
    {
	    document.getElementById("updateEmoji2").innerHTML = "&#128548;";
    }
  }
}

