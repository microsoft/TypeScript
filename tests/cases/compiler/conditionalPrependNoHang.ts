export type Prepend<Elm, T extends unknown[]> =
  T extends unknown ?
  ((arg: Elm, ...rest: T) => void) extends ((...args: infer T2) => void) ? T2 :
  never :
  never;
export type ExactExtract<T, U> = T extends U ? U extends T ? T : never : never;

type Conv<T, U = T> =
  { 0: [T]; 1: Prepend<T, Conv<ExactExtract<U, T>>>;}[U extends T ? 0 : 1];