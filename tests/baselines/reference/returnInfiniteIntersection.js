//// [tests/cases/compiler/returnInfiniteIntersection.ts] ////

//// [returnInfiniteIntersection.ts]
function recursive() {
    let x = <T>(subkey: T) => recursive();
    return x as typeof x & { p };
}

let result = recursive()(1)


//// [returnInfiniteIntersection.js]
function recursive() {
    let x = (subkey) => recursive();
    return x;
}
let result = recursive()(1);
