//// [tests/cases/compiler/incrementOnNullAssertion.ts] ////

//// [incrementOnNullAssertion.ts]
interface Dictionary<T> {
    [myFavouriteType: string]: T | undefined
}
const x = 'bar'
let foo: Dictionary<number> = {}
if (foo[x] === undefined) {
    foo[x] = 1
}
else {
    let nu = foo[x]
    let n = foo[x]
    foo[x]!++
}


//// [incrementOnNullAssertion.js]
const x = 'bar';
let foo = {};
if (foo[x] === undefined) {
    foo[x] = 1;
}
else {
    let nu = foo[x];
    let n = foo[x];
    foo[x]++;
}
