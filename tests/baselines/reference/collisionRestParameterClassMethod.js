//// [tests/cases/compiler/collisionRestParameterClassMethod.ts] ////

//// [collisionRestParameterClassMethod.ts]
class c1 {
    public foo(_i: number, ...restParameters) { //_i is error
        var _i = 10; // no error
    }
    public fooNoError(_i: number) { // no error
        var _i = 10; // no error
    }
    public f4(_i: number, ...rest); // no codegen no error
    public f4(_i: string, ...rest); // no codegen no error
    public f4(_i: any, ...rest) { // error
        var _i: any; // no error
    }

    public f4NoError(_i: number); // no error
    public f4NoError(_i: string); // no error
    public f4NoError(_i: any) { // no error
        var _i: any; // no error
    }
}

declare class c2 {
    public foo(_i: number, ...restParameters); // No error - no code gen
    public fooNoError(_i: number); // no error

    public f4(_i: number, ...rest); // no codegen no error
    public f4(_i: string, ...rest); // no codegen no error
    public f4NoError(_i: number); // no error
    public f4NoError(_i: string); // no error
}

class c3 {
    public foo(...restParameters) {
        var _i = 10; // no error
    }
    public fooNoError() {
        var _i = 10; // no error
    }
}

//// [collisionRestParameterClassMethod.js]
var c1 = /** @class */ (function () {
    function c1() {
    }
    c1.prototype.foo = function (_i) {
        var restParameters = [];
        for (var _a = 1; _a < arguments.length; _a++) {
            restParameters[_a - 1] = arguments[_a];
        }
        var _i = 10; // no error
    };
    c1.prototype.fooNoError = function (_i) {
        var _i = 10; // no error
    };
    c1.prototype.f4 = function (_i) {
        var rest = [];
        for (var _a = 1; _a < arguments.length; _a++) {
            rest[_a - 1] = arguments[_a];
        }
        var _i; // no error
    };
    c1.prototype.f4NoError = function (_i) {
        var _i; // no error
    };
    return c1;
}());
var c3 = /** @class */ (function () {
    function c3() {
    }
    c3.prototype.foo = function () {
        var restParameters = [];
        for (var _a = 0; _a < arguments.length; _a++) {
            restParameters[_a] = arguments[_a];
        }
        var _i = 10; // no error
    };
    c3.prototype.fooNoError = function () {
        var _i = 10; // no error
    };
    return c3;
}());
