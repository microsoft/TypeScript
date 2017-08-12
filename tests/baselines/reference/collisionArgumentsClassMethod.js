//// [collisionArgumentsClassMethod.ts]
class c1 {
    public foo(i: number, ...arguments) { //arguments is error
        var arguments: any[]; // no error
    }
    public foo1(arguments: number, ...rest) { //arguments is error
        var arguments = 10; // no error
    }
    public fooNoError(arguments: number) { // no error
        var arguments = 10; // no error
    }
    public f4(i: number, ...arguments); // no codegen no error
    public f4(i: string, ...arguments); // no codegen no error
    public f4(i: any, ...arguments) { // error
        var arguments: any[]; // no error
    }
    public f41(arguments: number, ...rest); // no codegen no error
    public f41(arguments: string, ...rest); // no codegen no error
    public f41(arguments: any, ...rest) { // error
        var arguments: any; // no error
    }
    public f4NoError(arguments: number); // no error
    public f4NoError(arguments: string); // no error
    public f4NoError(arguments: any) { // no error
        var arguments: any; // no error
    }
}

declare class c2 {
    public foo(i: number, ...arguments); // No error - no code gen
    public foo1(arguments: number, ...rest); // No error - no code gen
    public fooNoError(arguments: number); // No error - no code gen

    public f4(i: number, ...arguments); // no codegen no error
    public f4(i: string, ...arguments); // no codegen no error
    public f41(arguments: number, ...rest); // no codegen no error
    public f41(arguments: string, ...rest); // no codegen no error
    public f4NoError(arguments: number); // no error
    public f4NoError(arguments: string); // no error
}

class c3 {
    public foo(...restParameters) {
        var arguments = 10; // no error
    }
    public fooNoError() {
        var arguments = 10; // no error
    }
}

//// [collisionArgumentsClassMethod.js]
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
var c1 = (function () {
    function c1() {
    }
    c1.prototype.foo = function (i) {
        var arguments = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            arguments[_i - 1] = arguments[_i];
        }
        var arguments; // no error
    };
    c1.prototype.foo1 = function (arguments) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        var arguments = 10; // no error
    };
    c1.prototype.fooNoError = function (arguments) {
        var arguments = 10; // no error
    };
    c1.prototype.f4 = function (i) {
        var arguments = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            arguments[_i - 1] = arguments[_i];
        }
        var arguments; // no error
    };
    c1.prototype.f41 = function (arguments) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        var arguments; // no error
    };
    c1.prototype.f4NoError = function (arguments) {
        var arguments; // no error
    };
    __names(c1.prototype, ["foo", "foo1", "fooNoError", "f4", "f41", "f4NoError"]);
    return c1;
}());
var c3 = (function () {
    function c3() {
    }
    c3.prototype.foo = function () {
        var restParameters = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            restParameters[_i] = arguments[_i];
        }
        var arguments = 10; // no error
    };
    c3.prototype.fooNoError = function () {
        var arguments = 10; // no error
    };
    __names(c3.prototype, ["foo", "fooNoError"]);
    return c3;
}());
