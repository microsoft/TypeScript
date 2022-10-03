//// [collisionRestParameterInType.ts]
var v1: (_i: number, ...restParameters) => void; // no error - no code gen
var v2: {
    (_i: number, ...restParameters); // no error - no code gen
    new (_i: number, ...restParameters); // no error - no code gen
    foo(_i: number, ...restParameters); // no error - no code gen
    prop: (_i: number, ...restParameters) => void; // no error - no code gen
}

//// [collisionRestParameterInType.js]
var v1; // no error - no code gen
var v2;
