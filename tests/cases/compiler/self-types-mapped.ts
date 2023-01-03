// Implementing mapped types without mapped types

type User =
  { name: string
  , age: number
  }

type _Partial<T> = Mapped<keyof T, "_Partial", T, `_Partial<${Print<T>}>`>
interface Mappers<K, A> { _Partial: A[K & keyof A] | undefined }
// same as writing
// type _Partial<T> = { [K in keyof T]: T[K] | undefined }

let t00: _Partial<User> = {
  name: "foo",
  age: undefined
}

let t01: _Partial<User> = {
  name: 0,
  age: undefined
}

let t02: _Partial<User> = {
  age: undefined
}

type _Omit<T, K> = Mapped<Exclude<keyof T, K>, "_Omit", T, `_Omit<${Print<T>}, ${Print<K>}>`>
interface Mappers<K, A> { _Omit: A[K & keyof A] }
// same as writing
// type _Omit<T, K> = { [K in Exclude<keyof T, K>]: T[K] }

let t10: _Omit<User, "age"> = {
  name: "foo"
}

let t11: _Omit<User, "age"> = {
  name: 0
}

let t12: _Omit<User, "age"> = {
}

type FlipValues<T, K1 extends keyof T, K2 extends keyof T> =
  Mapped<keyof T, "FlipValues", [T, K1, K2], `FlipValues<${Print<T>}, ${Print<K1>}, ${Print<K2>}>`>
interface Mappers<K, A>
  { FlipValues:
      A extends [infer T, infer K1, infer K2]
        ? K extends K1 ? T[K2 & keyof T] :
          K extends K2 ? T[K1 & keyof T] :
          T[K & keyof T]
        : never
  }
// same as writing
// type FlipValues<T, K1 extends keyof T, K2 extends keyof T> =
//   { [K in keyof T]:
//       K extends K1 ? T[K2] :
//       K extends K2 ? T[K1] :
//       T[K]
//   }


let t30: FlipValues<User, "name", "age"> = {
  name: "foo",
  age: 0
}

let t31: FlipValues<User, "name", "age"> = {
  name: 0,
  age: "foo"
}

let t32: FlipValues<User, "name", "age"> = {
  name: 0
}

/**
 * @param K key of new type
 * @param F mapper identifier
 * @param A extra argument to mapper
 * @param N name of new type
 */
type Mapped<K, F, A, N> =
  MappedError<K, F, A, N, self> extends infer E extends string | string[]
    ? [E] extends [never] ? self : Never<E>
    : never

type MappedError<K, F, A, N, Self, KCopy = K> =
  UShift<
    K extends unknown
      ? K extends keyof Self
          ? Get<Mappers<K, A>, F> extends infer Fka // F<K, A>
              ? Self[K] extends Fka
                  ? never
                  : [ `Type '${Print<Self>}' is not assignable to type '${N & string}'`
                    , `Type '${Print<Self>}' is not assignable to type '${PrintMapped<KCopy, F, A>}'`
                    , `Types at property '${PrintKey<K>}' are incompatible`
                    , `Type '${Print<Self[K]>}' is not assignable to type '${Print<Fka>}'`
                    ]
              : never
          : [ `Type '${Print<Self>}' is not assignable to type '${N & string}'`
            , `Type '${Print<Self>}' is not assignable to type '${PrintMapped<KCopy, F, A>}'`
            , `Property '${PrintKey<K>}' is required in target type but missing in source type`
            ]
      : never
  >

interface Mappers<K, A> {}

type PrintMapped<K, F, A> = 
  `{ ${Join<
    K extends unknown
      ? `${PrintKey<K>}: ${Print<Get<Mappers<K, A>, F>>};`
      : never,
    " "
  >} }`


type Join<T extends string, D extends string> =
  UIsUnit<T> extends true ? `${T}` :
  `${Cast<UShift<T>, string | number>}${D}${Join<UShifted<T>, D>}`

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

type PrintKey<K> =
  K extends symbol ? Print<K> :
  K extends string ? K :
  K extends number ? K :
  never

type Get<T, K> =
  K extends keyof T ? T[K] : never

export {}