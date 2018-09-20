//// [argumentsObjectIterator01_ES5.ts]
function doubleAndReturnAsArray(x: number, y: number, z: number): [number, number, number] {
    let result = [];
    for (let arg of arguments) {
        result.push(arg + arg);
    }
    return <[any, any, any]>result;
}

//// [argumentsObjectIterator01_ES5.js]
function doubleAndReturnAsArray(x, y, z) {
    var result = [];
    for (var _i = 0, arguments_1 = arguments; _i < arguments_1.length; _i++) {
        var arg = arguments_1[_i];
        result.push(arg + arg);
    }
    return result;
}
