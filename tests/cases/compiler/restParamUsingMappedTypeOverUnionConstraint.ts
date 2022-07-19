// @noEmit: true
// @strict: true

// repro 29919#issuecomment-470948453

type Mapped<T> = { [P in keyof T]: T[P] extends string ? [number] : [string] }

declare function test<T extends [number] | [string]>(
  args: T,
  fn: (...args: Mapped<T>) => void
): number
