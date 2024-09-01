const section1 = document.querySelector('.section-1')
const num1 = document.getElementById('num1')
const num2 = document.getElementById('num2')
const questions = document.querySelectorAll('.question')
const q1 = document.querySelector('.q1')
const q2 = document.querySelector('.q2')
const skipBtn = document.querySelector('.skip-btn')
const answerForm = document.querySelector('.answer-form')
const answerInput = document.querySelector('.answer-input')
const score = document.querySelector('.score')
const mistakes = document.querySelector('.mistakes')
const resetBtn = document.querySelector('.reset-btn')

let state = {
  score: 0,
  mistakes: 0,
  numOne: [1],
  numTwo: [1]
}

function generateNumber(selectedValues) {
  const index = Math.floor(Math.random() * selectedValues.length)
  return selectedValues[index]
}

function generateQuestion() {
  const selectedValues1 = [...num1.options].filter(option => option.selected).map(option => option.value)
  const selectedValues2 = [...num2.options].filter(option => option.selected).map(option => option.value)
  state.numOne = generateNumber(selectedValues1)
  state.numTwo = generateNumber(selectedValues2)
  q1.innerText = state.numOne
  q2.innerText = state.numTwo
  answerInput.value = ''
  answerInput.focus()
}

section1.addEventListener('change', () => {
  generateQuestion()
})

answerForm.addEventListener('submit', handleSubmit)

function handleSubmit(e) {
  e.preventDefault()

  let correctAnswer = state.numOne * state.numTwo

  if (answerInput.valueAsNumber === correctAnswer) {
    state.score++
    score.innerText = state.score
    generateQuestion()
  } else {
    state.mistakes++
    mistakes.innerText = state.mistakes
    questions.forEach(question => {
      question.classList.add('animate-wrong')
    })
    setTimeout(() => {
      questions.forEach(question => {
        question.classList.remove('animate-wrong')
      })
    }, 500)
    answerInput.value = ''
  }
}

resetBtn.addEventListener('pointerup', () => window.location.reload())
skipBtn.addEventListener('pointerup', generateQuestion)

generateQuestion()