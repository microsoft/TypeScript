declare const f: (x: Exact<() => { a: { b: string }, c: number }>) => void

f(() => ({
  a: {
    b: "b",
    x: "x"
  },
  c: 0,
  y: 1
}))

let a0 = { a: { b: 1, c: "x", d: "y" } }
let t00: { a: { b: number } } = a0
let t01: Exact<{ a: { b: number } }> = a0

let a1 = (x: { a: number, b: number }) => ({ x: 0, y: 2 })
let t10: (x: { a: number, b: number, c: number }) => { x: number } = a1
let t11: Exact<(x: { a: number, b: number, c: number }) => { x: number }> = a1

type Exact<T> =
  self extends T
    ? ExactError<T, self> extends infer E
        ? [E] extends [never]
            ? self
            : Never<[
                `Type '${Print<self>}' is not assignable to type 'Exact<${Print<T>}>`,
                `Excess properties found at ${Join<E & string>}`
              ]>
        : never
    : T

type ExactError<T, A> =
  A extends T
    ? T extends unknown
        ? A extends (...a: infer Aa) => infer Ar
            ? T extends (...a: infer Ea) => infer Er
                ? Prefix<".$parameters", ExactError<Aa, Ea>> | Prefix<".$result", ExactError<Er, Ar>>
                : never :
          A extends object
            ? T extends object
                ? { [K in keyof A]:
                      K extends keyof T 
                        ? Prefix<`.${PrintKey<K>}`, ExactError<T[K], A[K]>>
                        : `.${PrintKey<K>}`
                  }[A extends unknown[] ? number & keyof A : keyof A]
                : never :
          never
        : never
    : never

type Join<T extends string, And = false> =
  UIsUnit<T> extends true ? `${And extends true ? "and " : ""}${T}` :
  `${Cast<UShift<T>, string | number>}, ${Join<UShifted<T>, true>}`

type Prefix<A, B> =
  [B] extends [never]
    ? B
    : `${A & string}${B & string}`

type PrintKey<K> = 
  K extends symbol ? Print<K> : K

type UShift<U> =
  UToIntersection<U extends unknown ? (x: U) => void : never> extends (_: infer H) => void
    ? H
    : never

type UToIntersection<T> =
  (T extends unknown ? (_: T) => void : never) extends ((_: infer I) => void)
    ? I
    : never

type UShifted<U> =
  Exclude<U, UShift<U>>

type UIsUnit<U> =
  [UShifted<U>] extends [never] ? true : false

type Cast<T, U> =
  T extends U ? T : U

export {}