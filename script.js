const columns = 10000
const rows = 65
const characters = '0 1 1 0 1 0'
const characterArray = characters.split('')
const characterColors = ['#00ff00', '#00dd00', '#00bb00', '#009900', '#007700']
const matrix = []
let timeoutId

function getRandomCharacter() {
  return characterArray[Math.floor(Math.random() * characterArray.length)]
}

function initializeMatrix() {
  for (let i = 0; i < rows; i++) {
    matrix.push(new Array(columns).fill(getRandomCharacter()))
  }
}

function clearScreen() {
  document.body.innerHTML = ''
}

function updateMatrix() {
  for (let i = rows - 1; i > 0; i--) {
    matrix[i] = matrix[i - 1].slice()
  }

  matrix[0] = matrix[0].map(() => getRandomCharacter())

  matrix[0] = matrix[0].map((character) => {
    return Math.random() < 0.1 ? getRandomCharacter() : character
  })
}

function renderMatrix(color, layerIndex) {
  for (let i = 0; i < matrix.length; i++) {
    const row = matrix[i]
    const rowElement = document.createElement('div')
    rowElement.textContent = row.join('')
    rowElement.style.opacity =
      1 - (i + layerIndex) / (matrix.length + characterColors.length)
    rowElement.style.color = color
    document.body.appendChild(rowElement)
  }

  const fadeOverlay = document.createElement('div')
  fadeOverlay.classList.add('fade-overlay')
  document.body.appendChild(fadeOverlay)
}

function matrixEffect(layerIndex = 0) {
  if (layerIndex < characterColors.length) {
    clearScreen()
    updateMatrix()
    renderMatrix(characterColors[layerIndex], layerIndex)
    setTimeout(() => matrixEffect(layerIndex + 1), 90)
  } else {
    setTimeout(matrixEffect, 100)
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initializeMatrix()
  matrixEffect()
})
