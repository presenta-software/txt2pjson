const findIndex = (code, line) => {
  let sceneNum = 0
  const lines = code.split('\n')
  for (var j = 0; j <= line; j++) {
    const l = lines[j]
    if (line === j) {
      return sceneNum
    }
    if (l === '') sceneNum++
  }
  return sceneNum
}

const findRange = (code, index) => {
  let sceneNum = -1
  let start = 0
  let end = 0
  const lines = code.split('\n')
  for (var j = 0; j <= lines.length; j++) {
    const l = lines[j]

    if (l === '') {
      sceneNum++
    }

    if (index === sceneNum) {
      end = j
      return { start, end }
    }

    if (l === '') {
      start = j + 1
    }
  }
  return { start, end }
}

export default { findIndex, findRange }
