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
var c1 = (function () {
    function c1(_i, restParameters) {
        var restParameters = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            restParameters[_i - 1] = arguments[_i];
        }
        var _i = 10;
    }
    return c1;
})();
var c1NoError = (function () {
    function c1NoError(_i) {
        var _i = 10;
    }
    return c1NoError;
})();
var c2 = (function () {
    function c2(restParameters) {
        var restParameters = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            restParameters[_i - 0] = arguments[_i];
        }
        var _i = 10;
    }
    return c2;
})();
var c2NoError = (function () {
    function c2NoError() {
        var _i = 10;
    }
    return c2NoError;
})();
var c3 = (function () {
    function c3(_i, restParameters) {
        var restParameters = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            restParameters[_i - 1] = arguments[_i];
        }
        this._i = _i;
        var _i = 10;
    }
    return c3;
})();
var c3NoError = (function () {
    function c3NoError(_i) {
        this._i = _i;
        var _i = 10;
    }
    return c3NoError;
})();
var c5 = (function () {
    function c5(_i, rest) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        var _i;
    }
    return c5;
})();
var c5NoError = (function () {
    function c5NoError(_i) {
        var _i;
    }
    return c5NoError;
})();
