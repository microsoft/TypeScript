//// [returnInfiniteIntersection.ts]
function recursive() {
    let x = <T>(subkey: T) => recursive();
    return x as typeof x & { p };
}

let result = recursive()(1)


//// [returnInfiniteIntersection.js]
function recursive() {
    var x = function (subkey) { return recursive(); };
    return x;
}
var result = recursive()(1);
