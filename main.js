const game = document.getElementById('game')
const scoreDisplay = document.getElementById('score')

const jeopardyCategories = [
    {
        genre: "WHO",
        questions: [
            {
                question: "Who Kickfliped El Toro?",
                answers: ["Dave Bachinsky", "Greg Myers"],
                correct: "Dave Bachinsky",
                level: "easy"
            },
            {
                question: "Who Hardfliped Macba?",
                answers: ["Jason Dill", "Bryan Herman"],
                correct: "Bryan Herman",
                level: "medium"
            },
            {
                question: "Who Double fliped Indoor Ten?",
                answers: ["Big Apple Ben", "Green Apple Mcdermott"],
                correct: "Big Apple Ben",
                level: "hard"
            },
        ]
    },
    {
        genre: "WHERE",
        questions: [
            {
                question: "Where is Flushing Meadow Park?",
                answers: ["Queens", "Brooklyn"],
                correct: "Queens",
                level: "easy"
            },
            {
                question: "Where is ABC Ledges?",
                answers: ["Staten Island", "Long Island"],
                correct: "Staten Island",
                level: "medium"
            },
            {
                question: "Where is my Mind?",
                answers: ["Here", "There"],
                correct: "Here",
                level: "hard"
            },
        ]
    },
    {
        genre: "WHEN",
        questions: [
            {
                question: "When is Go Skate Day?",
                answers: ["May 21st", "June 21st"],
                correct: "June 21st",
                level: "easy"
            },
            {
                question: "When does Street League start",
                answers: ["Who gives a fuck", "Wednesday"],
                correct: "Who gives a fuck",
                level: "medium"
            },
            {
                question: "When is it?",
                answers: ["Now", "2022"],
                correct: "Now",
                level: "hard"
            },
        ]
    },
    {
        genre: "WHAT",
        questions: [
            {
                question: "What team is Andrew Reynolds on?",
                answers: ["Baker", "Deathwish"],
                correct: "Baker",
                level: "easy"
            },
            {
                question: "What year did Fully Flared come out?",
                answers: ["2007", "1984"],
                correct: "2007",
                level: "medium"
            },
            {
                question: "What skater should be dead?",
                answers: ["Steve Berra", "Jereme Rogers"],
                correct: "Steve Berra",
                level: "hard"
            },
        ]
    },
    {
        genre: "HOW MANY",
        questions: [
            {
                question: "How many stairs is El Toro?",
                answers: ["20", "21"],
                correct: "20",
                level: "easy"
            },
            {
                question: "How many Static's are there?",
                answers: ["4", "5"],
                correct: "4",
                level: "medium"
            },
            {
                question: "How many nollie back bigspins should you do?",
                answers: ["400", "0"],
                correct: "0",
                level: "hard"
            },
        ]
    },
]

let score = 0



function addCategory(category) {
    const column = document.createElement('div')
    column.classList.add('genre-column')

    const genreTitle = document.createElement('div')
    genreTitle.classList.add('genre-title')
    genreTitle.innerHTML = category.genre

    column.appendChild(genreTitle)
    game.append(column)

    category.questions.forEach(boop => {
        const card = document.createElement('div')
        card.classList.add('card')
        column.append(card)

        if (boop.level === 'easy'){
            card.innerHTML = 100
        }
        if (boop.level === 'medium'){
            card.innerHTML = 200
        }
        if (boop.level === 'hard'){
            card.innerHTML = 300
        }

        card.setAttribute('data-question', boop.question)
        card.setAttribute('data-answer-1', boop.answers[0])
        card.setAttribute('data-answer-2', boop.answers[1])
        card.setAttribute('data-correct', boop.correct)
        card.setAttribute('data-value', card.getInnerHTML())

        card.addEventListener('click', flipCard)
    })
}

jeopardyCategories.forEach(category => addCategory(category))

function flipCard() {
    this.innerHTML = ""
    this.style.fontSize = "15px"
    this.style.lineHeight = "30px"
    const textDisplay = document.createElement('div')
    textDisplay.classList.add('card-text')
    textDisplay.innerHTML = this.getAttribute('data-question')
    const firstButton = document.createElement('button')
    const secondButton = document.createElement('button')
    firstButton.classList.add('first-button')
    secondButton.classList.add('second-button')
    firstButton.innerHTML = this.getAttribute('data-answer-1')
    secondButton.innerHTML = this.getAttribute('data-answer-2')
    firstButton.addEventListener('click', getResult)
    secondButton.addEventListener('click', getResult)
    this.append(textDisplay, firstButton, secondButton)

    const allCards = Array.from(document.querySelectorAll('.card'))
        allCards.forEach(card => card.removeEventListener('click', flipCard))
}

function getResult() {
    const allCards = Array.from(document.querySelectorAll('.card'))
    allCards.forEach(card => card.addEventListener('click', flipCard))
    const cardOfButton = this.parentElement

    if (cardOfButton.getAttribute('data-correct') == this.innerHTML) {
        score = score + parseInt(cardOfButton.getAttribute('data-value'))
        scoreDisplay.innerHTML = score
        cardOfButton.classList.add('correct-answer')   
        setTimeout(() => {
            while (cardOfButton.firstChild) {
                cardOfButton.removeChild(cardOfButton.lastChild)
            }
            cardOfButton.innerHTML = cardOfButton.getAttribute('data-value')
        }, 100)
    } else {
        cardOfButton.classList.add('wrong-answer')
        setTimeout(() => {
            while (cardOfButton.firstChild) {
                cardOfButton.removeChild(cardOfButton.lastChild)
            }
            cardOfButton.innerHTML = 0
        }, 100)
    }
    cardOfButton.removeEventListener('click', flipCard)
}