const columns = 800
const rows = 90
const characters =
  // 'A   B   C   D   E   F   G   H   I   J   K   L   M   N   O   P   Q   R   S   T   U   V   W   X   Y   Z   a   b   c   d   e   f   g   h   i   j   k   l   m   n   o   p   q   r   s   t   u   v   w   x   y   z   0   1   2   3   4   5   6   7   8   9   !   @   #   $   %   ^   &   *   (   )   _   +   -   =   [   ]   {   }   |   ;   :   ,   .   <   >   ?   /      '
  '0 1 0 1 0'
const characterArray = characters.split('')
const characterColors = ['#00ff00', '#00dd00', '#00bb00', '#009900']
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

function renderMatrix(color) {
  for (let i = 0; i < matrix.length; i++) {
    const row = matrix[i]
    const rowElement = document.createElement('div')
    rowElement.textContent = row.join('')
    rowElement.style.opacity = 1 - i / matrix.length
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
    renderMatrix(characterColors[layerIndex])
    setTimeout(() => matrixEffect(layerIndex + 1), 100)
  } else {
    setTimeout(matrixEffect, 100)
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initializeMatrix()
  matrixEffect()
})
