//// [tests/cases/conformance/types/spread/spreadContextualTypedBindingPattern.ts] ////

//// [spreadContextualTypedBindingPattern.ts]
// #18308
interface Person {
  naam: string,
  age: number
}

declare const bob: Person
declare const alice: Person

// [ts] Initializer provides no value for this binding element and the binding element has no default value.
const { naam, age } = {...bob, ...alice}


//// [spreadContextualTypedBindingPattern.js]
// [ts] Initializer provides no value for this binding element and the binding element has no default value.
const { naam, age } = Object.assign(Object.assign({}, bob), alice);
