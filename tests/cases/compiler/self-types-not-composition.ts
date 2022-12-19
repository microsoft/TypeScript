type Not<T> =
  self extends T
    ? never
    : self

const divide = (a: number, b: number & Not<0>) => a / b
// This doesn't work because currently the compiler assumes that
// if a type A is a subtype of B then type A will be a subtype of B & C for all A, B and C.
// But this is not true if C is a type like the above `Not` type.
// TODO: change intersection types to not make this assumption if any of the consituents
// have the ContainsSelf flag

divide(1, 0)
divide(1, 1)
divide(1, "x")

export {}