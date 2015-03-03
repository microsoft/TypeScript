//// [collisionRestParameterFunction.ts]
// Functions
function f1(_i: number, ...restParameters) { //_i is error
    var _i = 10; // no error
}
function f1NoError(_i: number) { // no error
    var _i = 10; // no error
}

declare function f2(_i: number, ...restParameters); // no error - no code gen
declare function f2NoError(_i: number); // no error

function f3(...restParameters) {
    var _i = 10; // no error
}
function f3NoError() {
    var _i = 10; // no error
}

function f4(_i: number, ...rest); // no codegen no error
function f4(_i: string, ...rest); // no codegen no error
function f4(_i: any, ...rest) { // error
}

function f4NoError(_i: number); // no error
function f4NoError(_i: string); // no error
function f4NoError(_i: any) { // no error
}

declare function f5(_i: number, ...rest); // no codegen no error
declare function f5(_i: string, ...rest); // no codegen no error

declare function f6(_i: number); // no codegen no error
declare function f6(_i: string); // no codegen no error

//// [collisionRestParameterFunction.js]
// Functions
function f1(_i) {
    var restParameters = [];
    for (var _i_1 = 1; _i_1 < arguments.length; _i_1++) {
        restParameters[_i_1 - 1] = arguments[_i_1];
    }
    var _i = 10; // no error
}
function f1NoError(_i) {
    var _i = 10; // no error
}
function f3() {
    var restParameters = [];
    for (var _i_1 = 0; _i_1 < arguments.length; _i_1++) {
        restParameters[_i_1 - 0] = arguments[_i_1];
    }
    var _i = 10; // no error
}
function f3NoError() {
    var _i = 10; // no error
}
function f4(_i) {
    var rest = [];
    for (var _i_1 = 1; _i_1 < arguments.length; _i_1++) {
        rest[_i_1 - 1] = arguments[_i_1];
    }
}
function f4NoError(_i) {
}
