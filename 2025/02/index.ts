const codes = (await Bun.file("./input.txt").text()).split(",")

let part1Total = 0

codes.forEach((code, index) => {
  const [start, end] = code.split("-").map((val) => parseInt(val)) as [number, number]
  let current = start

  while (current <= end) {
    if (String(current).length % 2 !== 0) {
      current++
      continue
    }

    const firstHalf = Math.floor(String(current).length / 2)
    const left = String(current).slice(0, firstHalf)
    const right = String(current).slice(firstHalf)

    if (left === right) {
      part1Total += current
    }

    current++
  }
})

console.log("Part 1:", part1Total)

let part2Total = 0

codes.forEach((code, index) => {
  const [start, end] = code.split("-").map((val) => parseInt(val)) as [number, number]
  let current = start

  while (current <= end) {
    const pattern = new RegExp(/^(\d+)\1+$/gm)

    let val
    while ((val = pattern.exec(String(current))) !== null) {
      if (val.index === pattern.lastIndex) {
        pattern.lastIndex++;
      }

      val.forEach((match, groupIndex) => {
        if (groupIndex % 2 !== 0) return
        part2Total += parseInt(match)
      });
    }

    current++
    continue
  }
})

console.log("Part 2:", part2Total)