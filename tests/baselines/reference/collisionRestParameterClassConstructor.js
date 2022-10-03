//// [collisionRestParameterClassConstructor.ts]
// Constructors
class c1 {
    constructor(_i: number, ...restParameters) { //_i is error
        var _i = 10; // no error
    }
}
class c1NoError {
    constructor(_i: number) { // no error
        var _i = 10; // no error
    }
}

class c2 {
    constructor(...restParameters) {
        var _i = 10; // no error
    }
}
class c2NoError {
    constructor() {
        var _i = 10; // no error
    }
}

class c3 {
    constructor(public _i: number, ...restParameters) { //_i is error
        var _i = 10; // no error
    }
}
class c3NoError {
    constructor(public _i: number) { // no error
        var _i = 10; // no error
    }
}

declare class c4 {
    constructor(_i: number, ...restParameters); // No error - no code gen
}
declare class c4NoError {
    constructor(_i: number);  // no error
}

class c5 {
    constructor(_i: number, ...rest); // no codegen no error
    constructor(_i: string, ...rest); // no codegen no error
    constructor(_i: any, ...rest) { // error
        var _i: any; // no error
    }
}

class c5NoError {
    constructor(_i: number); // no error
    constructor(_i: string); // no error
    constructor(_i: any) { // no error
        var _i: any; // no error
    }
}

declare class c6 {
    constructor(_i: number, ...rest); // no codegen no error
    constructor(_i: string, ...rest); // no codegen no error
}

declare class c6NoError {
    constructor(_i: number); // no error
    constructor(_i: string); // no error
}

//// [collisionRestParameterClassConstructor.js]
// Constructors
var c1 = /** @class */ (function () {
    function c1(_i) {
        var restParameters = [];
        for (var _a = 1; _a < arguments.length; _a++) {
            restParameters[_a - 1] = arguments[_a];
        }
        var _i = 10; // no error
    }
    return c1;
}());
var c1NoError = /** @class */ (function () {
    function c1NoError(_i) {
        var _i = 10; // no error
    }
    return c1NoError;
}());
var c2 = /** @class */ (function () {
    function c2() {
        var restParameters = [];
        for (var _a = 0; _a < arguments.length; _a++) {
            restParameters[_a] = arguments[_a];
        }
        var _i = 10; // no error
    }
    return c2;
}());
var c2NoError = /** @class */ (function () {
    function c2NoError() {
        var _i = 10; // no error
    }
    return c2NoError;
}());
var c3 = /** @class */ (function () {
    function c3(_i) {
        var restParameters = [];
        for (var _a = 1; _a < arguments.length; _a++) {
            restParameters[_a - 1] = arguments[_a];
        }
        this._i = _i;
        var _i = 10; // no error
    }
    return c3;
}());
var c3NoError = /** @class */ (function () {
    function c3NoError(_i) {
        this._i = _i;
        var _i = 10; // no error
    }
    return c3NoError;
}());
var c5 = /** @class */ (function () {
    function c5(_i) {
        var rest = [];
        for (var _a = 1; _a < arguments.length; _a++) {
            rest[_a - 1] = arguments[_a];
        }
        var _i; // no error
    }
    return c5;
}());
var c5NoError = /** @class */ (function () {
    function c5NoError(_i) {
        var _i; // no error
    }
    return c5NoError;
}());
