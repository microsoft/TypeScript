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
var c1 = (function () {
    function c1() {
    }
    var proto_1 = c1.prototype;
    proto_1.foo = function (_i) {
        var restParameters = [];
        for (var _a = 1; _a < arguments.length; _a++) {
            restParameters[_a - 1] = arguments[_a];
        }
        var _i = 10; // no error
    };
    proto_1.fooNoError = function (_i) {
        var _i = 10; // no error
    };
    proto_1.f4 = function (_i) {
        var rest = [];
        for (var _a = 1; _a < arguments.length; _a++) {
            rest[_a - 1] = arguments[_a];
        }
        var _i; // no error
    };
    proto_1.f4NoError = function (_i) {
        var _i; // no error
    };
    return c1;
}());
var c3 = (function () {
    function c3() {
    }
    var proto_2 = c3.prototype;
    proto_2.foo = function () {
        var restParameters = [];
        for (var _a = 0; _a < arguments.length; _a++) {
            restParameters[_a] = arguments[_a];
        }
        var _i = 10; // no error
    };
    proto_2.fooNoError = function () {
        var _i = 10; // no error
    };
    return c3;
}());
