let t0: TupleOf<"a" | "b" | "c"> = ["a", "b", "c"] as ["a", "b", "c"]
let t1: TupleOf<"a" | "b" | "c"> = ["c", "a", "b"] as ["c", "a", "b"]
let t2: TupleOf<"a" | "b" | "c"> = ["a", "x", "c"] as ["a", "x", "c"]
let t3: TupleOf<"a" | "b" | "c"> = ["a", "b", "b"] as ["a", "b", "b"]

type TupleOf<U> =
  self extends unknown[]
    ? number extends self["length"]
        ? TupleError<`Type '${Print<self>}' is not a tuple`, U, self>
        : self["length"] extends ULength<U>
            ? ParseTupleOf<U, self> extends infer E extends string
                ? [E] extends [never]
                    ? self
                    : TupleError<E, U, self>
                : never
            : TupleError<`Expected ${ULength<U>} elements got ${self["length"]}`, U, self>
    : TupleError<`Type '${Print<self>}' is not a tuple`, U, self>

type ParseTupleOf<U, Self, I extends 1[] = []> =
  Self extends [] ? never :
  Self extends [infer H, ...infer R] ? 
    H extends U
      ? ParseTupleOf<Exclude<U, H>, R, [...I, 1]>
      : `Type '${Print<H>}' at index ${I["length"]} is not assignable to type '${Print<U>}'` :
        // TODO?: An intrinsic SubTypeError<A, B> for using it here like
        // Never<[
        //   `Type '${Print<H>}' at index ${I["length"]} is not assignable to type '${Print<U>}'`]>
        //   ...SubTypeError<H, U>
        // ]>
  never

type TupleError<M extends string, U, Self> =
  Never<[
    `Type '${Print<Self>}' is not assignable to type 'TupleOf<${Print<U>}>'`,
    M
  ]>

type ULength<U, A extends 1[] = []> =
  [U] extends [never] ? A["length"] :
  ULength<UShifted<U>, [...A, 1]>

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
