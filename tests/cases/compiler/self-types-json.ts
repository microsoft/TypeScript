interface Node {
  children: Node[]
  parent: Node
}
let someNode = {} as Node

let t1: Json = someNode
let t2: Json<"AllowPossiblyCircular"> = someNode
let t3: Json = () => "hello"
let t4: Json = {
  x: () => "hello"
}
let t5: Json = {
  toJSON: () => "hello"
}
let t6: Json = new Map() // TODO: fourslash doesn't seem to include Map
let t7: Json = ["hello", undefined]
let t8: Json = ["hello", undefined] as [string, undefined]
let t9: Json<"AllowUndefined"> = ["hello", undefined]

type Json<Flags extends "AllowPossiblyCircular" | "AllowUndefined" = never> =
  JsonError<Flags, self> extends infer E
    ? [E] extends [never]
        ? self
        : Never<`Type '${Print<self>}' is not assignable to type 'Json', as ${E & string}`>
    : never

type JsonError<Flags, T, IsTopLevel = true, TCopy = T> =
  T extends (...a: never[]) => unknown
    ? `${IsTopLevel extends true ? "it " : ""}${UIsUnit<TCopy> extends true ? "is" : "could be"} a function` :
  T extends { toJSON: () => string }
    ? never :
  IsCircular<T> extends true
    ? "AllowPossiblyCircular" extends Flags
      ? never
      : `${IsTopLevel extends true ? "it " : ""}possibly has circular references` :
  T extends object
    ? UShift<{ [K in keyof T]:
        JsonError<Flags, T[K], false> extends infer E
          ? [E] extends [never]
              ? never
              : `value at .${K extends symbol ? `(${Print<K>})` : K} ${E & string}`
          : never
      }[T extends unknown[] ? number & keyof T : keyof T]> : 
  T extends undefined ? "AllowUndefined" extends Flags ? never : `${IsTopLevel extends true ? "it " : ""}${UIsUnit<TCopy> extends true ? "is" : "could be"} undefined` :
  T extends bigint ? `${IsTopLevel extends true ? "it " : ""}${UIsUnit<TCopy> extends true ? "is" : "could be"} a bigint` :
  T extends symbol ? `${IsTopLevel extends true ? "it " : ""}${UIsUnit<TCopy> extends true ? "is" : "could be"} a symbol` :
  never

type IsCircular<T, Visited = never> =
  T extends Visited ? true :
  T extends object
    ? true extends { [K in keyof T]: IsCircular<T[K], Visited | T> }[keyof T]
        ? true
        : false :
  false

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

export {}
