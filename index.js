var $start = document.querySelector('#start')
var $game = document.querySelector('#game')
var $time = document.querySelector('#time')
var $gameTime = document.querySelector('#game-time')
var $result = document.querySelector('#result')
var $speed = document.querySelector('#speed')
var $timeHeader = document.querySelector('#time-header')
var $resultHeader = document.querySelector('#result-header')

var score = 0
var isGameStarted
var maxTime = +$gameTime.getAttribute('max')
var minTime = +$gameTime.getAttribute('min')


$start.addEventListener('click', startGame)
$game.addEventListener('click', handleBoxClick)
$gameTime.addEventListener('input', setGameTime)

function show($el) {
    $el.classList.remove('hide')
}

function hide($el) {
    $el.classList.add('hide')
}

function startGame(){
    score = 0
    isGameStarted = true
    setGameTime()
    $gameTime.setAttribute('disabled', true)
    hide($start)
    $game.style.backgroundColor = '#fff'

    var interval = setInterval(function() {
        var time = parseFloat($time.textContent)

        if (time <= 0) {
            endGame()
            clearInterval(interval)
        }
        else {
            $time.textContent = (time - 0.1).toFixed(1)
        }
    }, 100)

    renderBox()
}

function setGameScore() {
    $result.textContent = score.toString()
    $speed.textContent = (score / +$gameTime.value).toFixed(1)
}

function setGameTime() {
    var time = +$gameTime.value

    if (time < minTime) {
        time = minTime
        $gameTime.value = isGameStarted ? 5 : $gameTime.value
    } 
    else if (time > maxTime) {
        time = maxTime
        $gameTime.value = isGameStarted ? 60 : $gameTime.value
    }

    $time.textContent = time.toFixed(1)
    hide($resultHeader)
    show($timeHeader)
}

function endGame() {
    isGameStarted = false
    setGameScore()
    $gameTime.removeAttribute('disabled')

    show($start)
    $game.innerHTML = ''
    $game.style.backgroundColor = '#ccc'
    hide($timeHeader)
    show($resultHeader)
}

function handleBoxClick(event) {
    if (!startGame) {
        return
    }

    if (event.target.dataset.box) {
        score++
        renderBox()
    }
}

function renderBox(){
    $game.innerHTML = ''
    var box = document.createElement('div')
    var boxSize = getRandom(35, 80)
    var gameSize = $game.getBoundingClientRect()
    var maxTop = gameSize.height - boxSize
    var maxLeft = gameSize.width - boxSize

    box.style.height = box.style.width = boxSize + 'px'
    box.style.position = 'absolute'
    box.style.borderRadius = '50%'
    box.style.backgroundColor = getColor()
    box.style.left = getRandom(0, maxLeft) + 'px'
    box.style.top = getRandom(0, maxTop) + 'px'
    box.style.cursor = 'pointer'
    box.setAttribute('data-box', 'true')

    $game.insertAdjacentElement('afterbegin', box)
}

function getRandom(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function getColor() {
    return '#' + Math.round(Math.random() * (16**6 - 1))
    .toString(16).toUpperCase().padStart(6, '0')
}