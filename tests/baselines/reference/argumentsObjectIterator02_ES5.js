//// [tests/cases/compiler/argumentsObjectIterator02_ES5.ts] ////

//// [argumentsObjectIterator02_ES5.ts]
function doubleAndReturnAsArray(x: number, y: number, z: number): [number, number, number] {
    let blah = arguments[Symbol.iterator];

    let result = [];
    for (let arg of blah()) {
        result.push(arg + arg);
    }
    return <[any, any, any]>result;
}



//// [argumentsObjectIterator02_ES5.js]
function doubleAndReturnAsArray(x, y, z) {
    let blah = arguments[Symbol.iterator];
    let result = [];
    for (let arg of blah()) {
        result.push(arg + arg);
    }
    return result;
}
