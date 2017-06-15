//// [nonstrictUndefinedNarrowsEntireUnion.ts]
// === undefined / null should remove the entire union, including number
function tripleEqualsDisjuct(x: string | number): string {
    return typeof x === 'string' || x === undefined ? x : "";
}
function tripleEquals(x: string | number): string {
    return x === undefined ? x : "";
}

function doubleEqualsDisjunct(x: string | number): string {
    return typeof x === 'string' || x == undefined ? x : "";
}
function doubleEquals(x: string | number): string {
    return x == undefined ? x : "";
}

function doubleEqualsNullDisjunct(x: string | number): string {
    return typeof x === 'string' || x == null ? x : "";
}
function doubleEqualsNull(x: string | number): string {
    return x == null ? x : "";
}


//// [nonstrictUndefinedNarrowsEntireUnion.js]
// === undefined / null should remove the entire union, including number
function tripleEqualsDisjuct(x) {
    return typeof x === 'string' || x === undefined ? x : "";
}
function tripleEquals(x) {
    return x === undefined ? x : "";
}
function doubleEqualsDisjunct(x) {
    return typeof x === 'string' || x == undefined ? x : "";
}
function doubleEquals(x) {
    return x == undefined ? x : "";
}
function doubleEqualsNullDisjunct(x) {
    return typeof x === 'string' || x == null ? x : "";
}
function doubleEqualsNull(x) {
    return x == null ? x : "";
}
