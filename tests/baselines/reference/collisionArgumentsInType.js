//// [collisionArgumentsInType.ts]
var v1: (i: number, ...arguments) => void; // no error - no code gen
var v12: (arguments: number, ...restParameters) => void; // no error - no code gen
var v2: {
    (arguments: number, ...restParameters); // no error - no code gen
    new (arguments: number, ...restParameters); // no error - no code gen
    foo(arguments: number, ...restParameters); // no error - no code gen
    prop: (arguments: number, ...restParameters) => void; // no error - no code gen
}
var v21: {
    (i: number, ...arguments); // no error - no code gen
    new (i: number, ...arguments); // no error - no code gen
    foo(i: number, ...arguments); // no error - no code gen
    prop: (i: number, ...arguments) => void; // no error - no code gen
}

//// [collisionArgumentsInType.js]
var v1; // no error - no code gen
var v12; // no error - no code gen
var v2;
var v21;
