const fs = require('fs')
const path = require('path')

const input = fs.readFileSync(path.join(__dirname, 'combo.txt'), 'utf8').trim()
const combo = input.split('\n')

let part1Solution = 0
let part2Solution = 0

let currentPosition = 50
const min = 0
const max = 99
const maxOffset = max + 1


const determineDirection = (input) => {
  return parseInt(input[0] === "L" ? -1 : 1)
}

const determineClicks = (input) => {
  return parseInt(input.slice(1))
}

combo.forEach((turn, idx) => {
  // Make sure we don't double count when starting at zero
  const didNotStartAtZero = currentPosition === 0 ? 0 : 1

  const clicks = determineDirection(turn) * determineClicks(turn)
  const clicksToAdd = clicks % 100


  currentPosition += clicksToAdd

  if (currentPosition < min) {
    currentPosition += maxOffset
    part2Solution += didNotStartAtZero
  } else if (currentPosition > max) {
    currentPosition -= maxOffset
    part2Solution += didNotStartAtZero
  } else if (currentPosition === 0) {
    part2Solution += didNotStartAtZero
  }

  // Count additional zeroes for every full rotation
  const fullRotations = Math.floor(Math.abs(clicks) / 100)
  part2Solution += fullRotations

  if (currentPosition === 0) {
    part1Solution++
  }
})

console.table({ part1Solution, part2Solution })