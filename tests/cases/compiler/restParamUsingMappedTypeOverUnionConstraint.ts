// @noEmit: true
// @strict: true

// repro 29919#issuecomment-470948453

type HomomorphicMappedType<T> = { [P in keyof T]: T[P] extends string ? boolean : null }

declare function test<T extends [number] | [string]>(
  args: T,
  fn: (...args: HomomorphicMappedType<T>) => void
): void
