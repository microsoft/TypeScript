let value = 1

// // fail: typeof with object input
// ? Why is symbol for `first` transient here?
// ?? Because created by the type checker, not by binder?
function decorateA<O extends any>(fn: (first: {value: typeof value}) => O) {
    return (): O => fn({value})
}
let a = decorateA(({value}) => 5)

// success: typeof with primitive input
// When getting the type of `first`, the symbol for `first`
// is not `CheckFlags.Instantiated`, so we don't try to instantiate it
// Symbol for `first` is not transient, it doesn't have any check flags.
// Symbol for object types (anonymous object type) is transient.
// To get the type of Symbol `first`,
//  we just use `getTypeOfVariableOrParameterOrProperty`,
//  and the type is cached in symbollinks.
// function decorateB<O extends any>(fn: (first: typeof value) => O) {
//     return (): O => fn(value)
// }
// let b = decorateB((value) => 5)

// // success: object input
// Symbol for `first` is transient but we can instantiate `{value: number}`
// without fixing `O`, because we can detect `O` doesn't occur in `{value: number}`.
// function decorateC<O extends any>(fn: (first: {value: number}) => O) {
//     return (): O => fn({value})
// }
// let c = decorateC(({value}) => 5)

// // success: typeof with object input, and some indirection
// Symbol for `first` again not transient (?).
// type First = {value: typeof value}
// function decorateD<O extends any>(fn: (first: First) => O) {
//     return (): O => fn({value})
// }
// let d = decorateD(({value}) => 5)