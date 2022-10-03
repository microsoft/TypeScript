// #18308
interface Person {
  naam: string,
  age: number
}

declare const bob: Person
declare const alice: Person

// [ts] Initializer provides no value for this binding element and the binding element has no default value.
const { naam, age } = {...bob, ...alice}
