let mainText = document.querySelector("h1")
let buttons = document.querySelectorAll("button")
let variables = document.querySelector(".variables")
let sbutton = document.querySelector("h2")

let static = document.querySelector("h3")

let cookie = false
let cookies = document.cookie.split('; ')

for (let i = 0; i < cookies.length; i++) {
    if (cookies[i].split("=")[0] == "lastResult") {
        cookie = cookies[i].split("=")[1]
        break
    }
}

if (cookie) {
    let data = cookie.split('/')
    static.innerHTML = `<h3>В прошлый раз вы дали ${data[1]} правильных ответов из ${data[0]}. Точность - ${Math.round(data[1] * 100 / data[0])}%.</h3>`
}
// ------------------- Start Button

variables.style.display = 'none'

sbutton.addEventListener("click", () => {
    sbutton.style.display = "none"
    static.innerHTML = ""
    variables.style.display = ""
    
    setTimeout(function() {
        variables.style.display = 'none'
        sbutton.style.display = ""
        
        static.innerHTML = `Вы дали ${correct_answers_given} правильных ответов из ${total_answers_given}. Точность - ${Math.round(correct_answers_given * 100 / total_answers_given)}%.`
        let lastResult_cookie = `lastResult=${total_answers_given}/${correct_answers_given}; max-age=100000000000`
        document.cookie = lastResult_cookie
        
    }, 10000)

    console.log("Start")
})



function random(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

function getRandomSign() {
    let sings = ["+", "-", "*", "/"]
    return sings[random(0, 3)]
}

class Question {
    constructor() {
        let a = random(1, 30)
        let b = random(1, 30)

        let sign = getRandomSign()
        this.question = `${a} ${sign} ${b}`

        if (sign == '+') {this.correct = a + b}
        else if (sign == '-') {this.correct = a - b}
        else if (sign == '*') {this.correct = a * b}
        else if (sign == '/') {this.correct = a / b}

        this.answers = [
            random(this.correct - 15, this.correct - 1),
            random(this.correct - 15, this.correct - 1),
            this.correct,
            random(this.correct + 1, this.correct + 15),
            random(this.correct + 1, this.correct + 15),
        ]

        shuffle(this.answers)
    }

    Apply() {
        mainText.innerHTML = this.question
        for (let i = 0; i < this.answers.length; i++) {
            buttons[i].innerHTML = this.answers[i]
        }
    }
}

// Static
let correct_answers_given = 0
let total_answers_given = 0
let current_question

current_question = new Question()
current_question.Apply()


for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', () => {
        if (buttons[i].innerHTML == current_question.correct) {
            correct_answers_given += 1
            buttons[i].style.background = '#D7F025'
            
            anime({
                targets: buttons[i],
                background: '#FFFFFF',
                duration: 500,
                delay: 100,
                easing: 'linear'
            })
        } else {
            buttons[i].style.background = "#FF0000"
            anime({
                targets: buttons[i],
                background: '#FFFFFF',
                duration: 500,
                delay: 100,
                easing: 'linear'
            })
        }

        total_answers_given += 1
        current_question = new Question
        current_question.Apply()
        
    })
}
