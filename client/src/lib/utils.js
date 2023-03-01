export function numberToString(number, precision = 6) {
  number = +number || 0
  if (number === ~~number) {
    return `${number}`
  }
  const [num, exp] = `${number}`.split('e-')
  if (exp) {
    return `0.${new Array(exp - 1).join('0')}${num.replace(/\./, '')}`
  } else {
    const asInt = parseInt(number)
    if (asInt === parseInt(asInt.toPrecision(precision))) {
      return number.toPrecision(precision).replace(/\.?0+$/, '')
    } else {
      return asInt
    }
  }
}
