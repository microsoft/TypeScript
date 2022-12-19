type NonZeroNumber =
  self extends number
    ? self extends 0
        ? Never<`Type '${Print<self>}' is not assignable to type 'NonZeroNumber'`>
        : self
    : number

const divide = (a: number, b: NonZeroNumber) => (a / (b as number)) as NonZeroNumber

divide(1, 0)
divide(1, 1)
divide(1, "x")

export {}