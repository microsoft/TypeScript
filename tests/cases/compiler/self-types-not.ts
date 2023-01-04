type Not<T> =
  self extends T
    ? Never<`Type '${Print<self>}' is not assignable to type 'Not<${Print<T>}>'`>
    : self

const divide = (a: number, b: number & Not<0>) => a / b

divide(1, 0)
divide(1, 1)
divide(1, "x")

export {}