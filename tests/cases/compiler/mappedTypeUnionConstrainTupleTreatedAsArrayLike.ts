// @noEmit: true
// @strict: true

type HomomorphicMappedType<T> = { [P in keyof T]: T[P] extends string ? boolean : null }

function test1<T extends [number] | [string]>(args: T) {
  const arr: any[] = [] as HomomorphicMappedType<T>
  const arr2: readonly any[] = [] as HomomorphicMappedType<T>
}

function test2<T extends [number] | readonly [string]>(args: T) {
  const arr: any[] = [] as HomomorphicMappedType<T> // error
  const arr2: readonly any[] = [] as HomomorphicMappedType<T>
}
