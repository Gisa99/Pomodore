const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt =  document.querySelector('.app__card-button--longo');
const banner =  document.querySelector('.app__image')
const title =  document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const inciciarPausarBt = document.querySelector('#start-pause span')
const iconePausarOuIniciar = document.querySelector('.app__card-primary-butto-icon')
const musicaFocoInput =  document.querySelector('#alternar-musica')
const musica = new Audio('./sons/luna-rise-part-one.mp3')
musica.loop = true
const botaoStart = document.querySelector('#start-pause')
const tempoNaTela = document.querySelector('#timer')
const playMusic = new Audio('./sons/play.wav')
const pauseMusic =  new Audio('./sons/pause.mp3')
const beepMusic =  new Audio('./sons/beep.mp3')

let tempoDecorridoEmSegundos = 1500;
let intervaloId =  null;

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused){
        musica.play()
    }else{
        musica.pause()
    }
})

//primeira forma de altera a cor de fundo

focoBt.addEventListener('click', () =>{
    tempoDecorridoEmSegundos = 30;
    alterarContexto('foco')
    focoBt.classList.add('active');
})

curtoBt.addEventListener('click', () =>{
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () =>{
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})


function alterarContexto(contexto){
    mostrarTempo()
    botoes.forEach(function(contexto){
        contexto.classList.remove('active')
    })

    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `./imagens/${contexto}.png`)
    switch (contexto){
        case "foco":
            title.innerHTML = `É hora de focar!<br><strong class="app__title-strong"> Estude por 25 minutos. </strong>`
            break;
        case "descanso-curto":
            title.innerHTML = `Bom trabalho!<br><strong class="app__title-strong"> Faça uma pausa curta.</strong>`
            break;
        case "descanso-longo":
            title.innerHTML = `Que tal um lanchinho?<br><strong class="app__title-strong"> Faça uma pausa longa.</strong>`
            break;
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0){
        beepMusic.play()
        alert('tempo finalizado')
        const focoAtivo = html.getAttribute('data-contexto') == 'foco'
        if(focoAtivo){
            const evento = new CustomEvent('FocoFinalizado')
            document.dispatchEvent(evento)
        }
        zerar()
        return 
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
}

botaoStart.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar(){
  
    if(intervaloId){
        pauseMusic.play()
        zerar()
        return
    }
    playMusic.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    inciciarPausarBt.textContent = "Pausar"
    iconePausarOuIniciar.setAttribute('src', './imagens/pause.png')
    
}

function zerar(){
    clearInterval(intervaloId)
    inciciarPausarBt.textContent ="Começar"
    iconePausarOuIniciar.setAttribute('src', './imagens/play_arrow.png')
    intervaloId = null
}

function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}` 
}

mostrarTempo()