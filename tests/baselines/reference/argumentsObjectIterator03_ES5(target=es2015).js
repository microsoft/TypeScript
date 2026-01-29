//// [tests/cases/compiler/argumentsObjectIterator03_ES5.ts] ////

//// [argumentsObjectIterator03_ES5.ts]
function asReversedTuple(a: number, b: string, c: boolean): [boolean, string, number] {
    let [x, y, z] = arguments;
    
    return [z, y, x];
}



//// [argumentsObjectIterator03_ES5.js]
function asReversedTuple(a, b, c) {
    let [x, y, z] = arguments;
    return [z, y, x];
}
