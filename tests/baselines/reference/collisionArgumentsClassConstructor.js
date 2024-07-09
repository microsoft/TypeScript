//// [tests/cases/compiler/collisionArgumentsClassConstructor.ts] ////

//// [collisionArgumentsClassConstructor.ts]
// Constructors
class c1 {
    constructor(i: number, ...arguments) { // error
        var arguments: any[]; // no error
    }
}
class c12 {
    constructor(arguments: number, ...rest) { // error
        var arguments = 10; // no error
    }
}
class c1NoError {
    constructor(arguments: number) { // no error
        var arguments = 10; // no error
    }
}

class c2 {
    constructor(...restParameters) {
        var arguments = 10; // no error
    }
}
class c2NoError {
    constructor() {
        var arguments = 10; // no error
    }
}

class c3 {
    constructor(public arguments: number, ...restParameters) { //arguments is error
        var arguments = 10; // no error
    }
}
class c3NoError {
    constructor(public arguments: number) { // no error
        var arguments = 10; // no error
    }
}

declare class c4 {
    constructor(i: number, ...arguments); // No error - no code gen
}
declare class c42 {
    constructor(arguments: number, ...rest); // No error - no code gen
}
declare class c4NoError {
    constructor(arguments: number);  // no error
}

class c5 {
    constructor(i: number, ...arguments); // no codegen no error
    constructor(i: string, ...arguments); // no codegen no error
    constructor(i: any, ...arguments) { // error
        var arguments: any[]; // no error
    }
}

class c52 {
    constructor(arguments: number, ...rest); // no codegen no error
    constructor(arguments: string, ...rest); // no codegen no error
    constructor(arguments: any, ...rest) { // error
        var arguments: any; // no error
    }
}

class c5NoError {
    constructor(arguments: number); // no error
    constructor(arguments: string); // no error
    constructor(arguments: any) { // no error
        var arguments: any; // no error
    }
}

declare class c6 {
    constructor(i: number, ...arguments); // no codegen no error
    constructor(i: string, ...arguments); // no codegen no error
}
declare class c62 {
    constructor(arguments: number, ...rest); // no codegen no error
    constructor(arguments: string, ...rest); // no codegen no error
}

declare class c6NoError {
    constructor(arguments: number); // no error
    constructor(arguments: string); // no error
}

//// [collisionArgumentsClassConstructor.js]
// Constructors
var c1 = /** @class */ (function () {
    function c1(i) {
        var arguments = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            arguments[_i - 1] = arguments[_i];
        }
        var arguments; // no error
    }
    return c1;
}());
var c12 = /** @class */ (function () {
    function c12(arguments) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        var arguments = 10; // no error
    }
    return c12;
}());
var c1NoError = /** @class */ (function () {
    function c1NoError(arguments) {
        var arguments = 10; // no error
    }
    return c1NoError;
}());
var c2 = /** @class */ (function () {
    function c2() {
        var restParameters = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            restParameters[_i] = arguments[_i];
        }
        var arguments = 10; // no error
    }
    return c2;
}());
var c2NoError = /** @class */ (function () {
    function c2NoError() {
        var arguments = 10; // no error
    }
    return c2NoError;
}());
var c3 = /** @class */ (function () {
    function c3(arguments) {
        var restParameters = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            restParameters[_i - 1] = arguments[_i];
        }
        this.arguments = arguments;
        var arguments = 10; // no error
    }
    return c3;
}());
var c3NoError = /** @class */ (function () {
    function c3NoError(arguments) {
        this.arguments = arguments;
        var arguments = 10; // no error
    }
    return c3NoError;
}());
var c5 = /** @class */ (function () {
    function c5(i) {
        var arguments = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            arguments[_i - 1] = arguments[_i];
        }
        var arguments; // no error
    }
    return c5;
}());
var c52 = /** @class */ (function () {
    function c52(arguments) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        var arguments; // no error
    }
    return c52;
}());
var c5NoError = /** @class */ (function () {
    function c5NoError(arguments) {
        var arguments; // no error
    }
    return c5NoError;
}());
