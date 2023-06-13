//// [tests/cases/compiler/argumentsObjectIterator03_ES5.ts] ////

//// [argumentsObjectIterator03_ES5.ts]
function asReversedTuple(a: number, b: string, c: boolean): [boolean, string, number] {
    let [x, y, z] = arguments;
    
    return [z, y, x];
}



//// [argumentsObjectIterator03_ES5.js]
function asReversedTuple(a, b, c) {
    var x = arguments[0], y = arguments[1], z = arguments[2];
    return [z, y, x];
}
