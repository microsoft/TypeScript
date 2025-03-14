//// [tests/cases/compiler/substitutionTypeForIndexedAccessType2.ts] ////

//// [substitutionTypeForIndexedAccessType2.ts]
interface Foo {
  foo: string|undefined
}

type Str<T extends string> = T

type Bar<T> = 
  T extends Foo
    ? T['foo'] extends string
      ? Str<T['foo']>
      : never
    : never

//// [substitutionTypeForIndexedAccessType2.js]
