//// [tests/cases/conformance/classes/propertyMemberDeclarations/staticPropertyNameConflicts.ts] ////

//// [staticPropertyNameConflicts.ts]
const FunctionPropertyNames = {
    name: 'name',
    length: 'length',
    prototype: 'prototype',
    caller: 'caller',
    arguments: 'arguments',
} as const;

// name
class StaticName {
    static name: number; // error without useDefineForClassFields
    name: string; // ok
}

class StaticName2 {
    static [FunctionPropertyNames.name]: number; // error without useDefineForClassFields
    [FunctionPropertyNames.name]: number; // ok
}

class StaticNameFn {
    static name() {} // error without useDefineForClassFields
    name() {} // ok
}

class StaticNameFn2 {
    static [FunctionPropertyNames.name]() {} // error without useDefineForClassFields
    [FunctionPropertyNames.name]() {} // ok
}

// length
class StaticLength {
    static length: number; // error without useDefineForClassFields
    length: string; // ok
}

class StaticLength2 {
    static [FunctionPropertyNames.length]: number; // error without useDefineForClassFields
    [FunctionPropertyNames.length]: number; // ok
}

class StaticLengthFn {
    static length() {} // error without useDefineForClassFields
    length() {} // ok
}

class StaticLengthFn2 {
    static [FunctionPropertyNames.length]() {} // error without useDefineForClassFields
    [FunctionPropertyNames.length]() {} // ok
}

// prototype
class StaticPrototype {
    static prototype: number; // always an error
    prototype: string; // ok
}

class StaticPrototype2 {
    static [FunctionPropertyNames.prototype]: number; // always an error
    [FunctionPropertyNames.prototype]: string; // ok
}

class StaticPrototypeFn {
    static prototype() {} // always an error
    prototype() {} // ok
}

class StaticPrototypeFn2 {
    static [FunctionPropertyNames.prototype]() {} // always an error
    [FunctionPropertyNames.prototype]() {} // ok
}

// caller
class StaticCaller {
    static caller: number; // error without useDefineForClassFields
    caller: string; // ok
}

class StaticCaller2 {
    static [FunctionPropertyNames.caller]: number; // error without useDefineForClassFields
    [FunctionPropertyNames.caller]: string; // ok
}

class StaticCallerFn {
    static caller() {} // error without useDefineForClassFields
    caller() {} // ok
}

class StaticCallerFn2 {
    static [FunctionPropertyNames.caller]() {} // error without useDefineForClassFields
    [FunctionPropertyNames.caller]() {} // ok
}

// arguments
class StaticArguments {
    static arguments: number; // error without useDefineForClassFields
    arguments: string; // ok
}

class StaticArguments2 {
    static [FunctionPropertyNames.arguments]: number; // error without useDefineForClassFields
    [FunctionPropertyNames.arguments]: string; // ok
}

class StaticArgumentsFn {
    static arguments() {} // error without useDefineForClassFields
    arguments() {} // ok
}

class StaticArgumentsFn2 {
    static [FunctionPropertyNames.arguments]() {} // error without useDefineForClassFields
    [FunctionPropertyNames.arguments]() {} // ok
}


// === Static properties on anonymous classes ===

// name
var StaticName_Anonymous = class {
    static name: number; // error without useDefineForClassFields
    name: string; // ok
}

var StaticName_Anonymous2 = class {
    static [FunctionPropertyNames.name]: number; // error without useDefineForClassFields
    [FunctionPropertyNames.name]: string; // ok
}

var StaticNameFn_Anonymous = class {
    static name() {} // error without useDefineForClassFields
    name() {} // ok
}

var StaticNameFn_Anonymous2 = class {
    static [FunctionPropertyNames.name]() {} // error without useDefineForClassFields
    [FunctionPropertyNames.name]() {} // ok
}

// length
var StaticLength_Anonymous = class {
    static length: number; // error without useDefineForClassFields
    length: string; // ok
}

var StaticLength_Anonymous2 = class {
    static [FunctionPropertyNames.length]: number; // error without useDefineForClassFields
    [FunctionPropertyNames.length]: string; // ok
}

var StaticLengthFn_Anonymous = class {
    static length() {} // error without useDefineForClassFields
    length() {} // ok
}

var StaticLengthFn_Anonymous2 = class {
    static [FunctionPropertyNames.length]() {} // error without useDefineForClassFields
    [FunctionPropertyNames.length]() {} // ok
}

// prototype
var StaticPrototype_Anonymous = class {
    static prototype: number; // always an error
    prototype: string; // ok
}

var StaticPrototype_Anonymous2 = class {
    static [FunctionPropertyNames.prototype]: number; // always an error
    [FunctionPropertyNames.prototype]: string; // ok
}

var StaticPrototypeFn_Anonymous = class {
    static prototype() {} // always an error
    prototype() {} // ok
}

var StaticPrototypeFn_Anonymous2 = class {
    static [FunctionPropertyNames.prototype]() {} // always an error
    [FunctionPropertyNames.prototype]() {} // ok
}

// caller
var StaticCaller_Anonymous = class {
    static caller: number; // error without useDefineForClassFields
    caller: string; // ok
}

var StaticCaller_Anonymous2 = class {
    static [FunctionPropertyNames.caller]: number; // error without useDefineForClassFields
    [FunctionPropertyNames.caller]: string; // ok
}

var StaticCallerFn_Anonymous = class {
    static caller() {} // error without useDefineForClassFields
    caller() {} // ok
}

var StaticCallerFn_Anonymous2 = class {
    static [FunctionPropertyNames.caller]() {} // error without useDefineForClassFields
    [FunctionPropertyNames.caller]() {} // ok
}

// arguments
var StaticArguments_Anonymous = class {
    static arguments: number; // error without useDefineForClassFields
    arguments: string; // ok
}

var StaticArguments_Anonymous2 = class {
    static [FunctionPropertyNames.arguments]: number; // error without useDefineForClassFields
    [FunctionPropertyNames.arguments]: string; // ok
}

var StaticArgumentsFn_Anonymous = class {
    static arguments() {} // error without useDefineForClassFields
    arguments() {} // ok
}

var StaticArgumentsFn_Anonymous2 = class {
    static [FunctionPropertyNames.arguments]() {} // error without useDefineForClassFields
    [FunctionPropertyNames.arguments]() {} // ok
}


// === Static properties on default exported classes ===

// name
module TestOnDefaultExportedClass_1 {
    class StaticName {
        static name: number; // error without useDefineForClassFields
        name: string; // ok
    }
}

export class ExportedStaticName {
    static [FunctionPropertyNames.name]: number; // error without useDefineForClassFields
    [FunctionPropertyNames.name]: string; // ok
}

module TestOnDefaultExportedClass_2 {
    class StaticNameFn {
        static name() {} // error without useDefineForClassFields
        name() {} // ok
    }
}

export class ExportedStaticNameFn {
    static [FunctionPropertyNames.name]() {} // error without useDefineForClassFields
    [FunctionPropertyNames.name]() {} // ok
}

// length
module TestOnDefaultExportedClass_3 {
    export default class StaticLength {
        static length: number; // error without useDefineForClassFields
        length: string; // ok
    }
}

export class ExportedStaticLength {
    static [FunctionPropertyNames.length]: number; // error without useDefineForClassFields
    [FunctionPropertyNames.length]: string; // ok
}

module TestOnDefaultExportedClass_4 {
    export default class StaticLengthFn {
        static length() {} // error without useDefineForClassFields
        length() {} // ok
    }
}

export class ExportedStaticLengthFn {
    static [FunctionPropertyNames.length]() {} // error without useDefineForClassFields
    [FunctionPropertyNames.length]() {} // ok
}

// prototype
module TestOnDefaultExportedClass_5 {
    export default class StaticPrototype {
        static prototype: number; // always an error
        prototype: string; // ok
    }
}

export class ExportedStaticPrototype {
    static [FunctionPropertyNames.prototype]: number; // always an error
    [FunctionPropertyNames.prototype]: string; // ok
}

module TestOnDefaultExportedClass_6 {
    export default class StaticPrototypeFn {
        static prototype() {} // always an error
        prototype() {} // ok
    }
}

export class ExportedStaticPrototypeFn {
    static [FunctionPropertyNames.prototype]() {} // always an error
    [FunctionPropertyNames.prototype]() {} // ok
}

// caller
module TestOnDefaultExportedClass_7 {
    export default class StaticCaller {
        static caller: number; // error without useDefineForClassFields
        caller: string; // ok
    }
}

export class ExportedStaticCaller {
    static [FunctionPropertyNames.caller]: number; // error without useDefineForClassFields
    [FunctionPropertyNames.caller]: string; // ok
}

module TestOnDefaultExportedClass_8 {
    export default class StaticCallerFn {
        static caller() {} // error without useDefineForClassFields
        caller() {} // ok
    }
}

export class ExportedStaticCallerFn {
    static [FunctionPropertyNames.caller]() {} // error without useDefineForClassFields
    [FunctionPropertyNames.caller]() {} // ok
}

// arguments
module TestOnDefaultExportedClass_9 {
    export default class StaticArguments {
        static arguments: number; // error without useDefineForClassFields
        arguments: string; // ok
    }
}

export class ExportedStaticArguments {
    static [FunctionPropertyNames.arguments]: number; // error without useDefineForClassFields
    [FunctionPropertyNames.arguments]: string; // ok
}

module TestOnDefaultExportedClass_10 {
    export default class StaticArgumentsFn {
        static arguments() {} // error without useDefineForClassFields
        arguments() {} // ok
    }
}

export class ExportedStaticArgumentsFn {
    static [FunctionPropertyNames.arguments]() {} // error without useDefineForClassFields
    [FunctionPropertyNames.arguments]() {} // ok
}

//// [staticPropertyNameConflicts.js]
"use strict";
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportedStaticArgumentsFn = exports.ExportedStaticArguments = exports.ExportedStaticCallerFn = exports.ExportedStaticCaller = exports.ExportedStaticPrototypeFn = exports.ExportedStaticPrototype = exports.ExportedStaticLengthFn = exports.ExportedStaticLength = exports.ExportedStaticNameFn = exports.ExportedStaticName = void 0;
var FunctionPropertyNames = {
    name: 'name',
    length: 'length',
    prototype: 'prototype',
    caller: 'caller',
    arguments: 'arguments',
};
// name
var StaticName = /** @class */ (function () {
    function StaticName() {
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        }); // ok
    }
    return StaticName;
}());
var StaticName2 = /** @class */ (function () {
    function StaticName2() {
        Object.defineProperty(this, _b, {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        }); // ok
    }
    return StaticName2;
}());
_a = FunctionPropertyNames.name, _b = FunctionPropertyNames.name;
var StaticNameFn = /** @class */ (function () {
    function StaticNameFn() {
    }
    Object.defineProperty(StaticNameFn, "name", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () { }
    }); // error without useDefineForClassFields
    Object.defineProperty(StaticNameFn.prototype, "name", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () { }
    }); // ok
    return StaticNameFn;
}());
var StaticNameFn2 = /** @class */ (function () {
    function StaticNameFn2() {
    }
    Object.defineProperty(StaticNameFn2, FunctionPropertyNames.name, {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () { }
    }); // error without useDefineForClassFields
    Object.defineProperty(StaticNameFn2.prototype, FunctionPropertyNames.name, {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () { }
    }); // ok
    return StaticNameFn2;
}());
// length
var StaticLength = /** @class */ (function () {
    function StaticLength() {
        Object.defineProperty(this, "length", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        }); // ok
    }
    return StaticLength;
}());
var StaticLength2 = /** @class */ (function () {
    function StaticLength2() {
        Object.defineProperty(this, _d, {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        }); // ok
    }
    return StaticLength2;
}());
_c = FunctionPropertyNames.length, _d = FunctionPropertyNames.length;
var StaticLengthFn = /** @class */ (function () {
    function StaticLengthFn() {
    }
    Object.defineProperty(StaticLengthFn, "length", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () { }
    }); // error without useDefineForClassFields
    Object.defineProperty(StaticLengthFn.prototype, "length", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () { }
    }); // ok
    return StaticLengthFn;
}());
var StaticLengthFn2 = /** @class */ (function () {
    function StaticLengthFn2() {
    }
    Object.defineProperty(StaticLengthFn2, FunctionPropertyNames.length, {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () { }
    }); // error without useDefineForClassFields
    Object.defineProperty(StaticLengthFn2.prototype, FunctionPropertyNames.length, {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () { }
    }); // ok
    return StaticLengthFn2;
}());
// prototype
var StaticPrototype = /** @class */ (function () {
    function StaticPrototype() {
        Object.defineProperty(this, "prototype", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        }); // ok
    }
    return StaticPrototype;
}());
var StaticPrototype2 = /** @class */ (function () {
    function StaticPrototype2() {
        Object.defineProperty(this, _f, {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        }); // ok
    }
    return StaticPrototype2;
}());
_e = FunctionPropertyNames.prototype, _f = FunctionPropertyNames.prototype;
var StaticPrototypeFn = /** @class */ (function () {
    function StaticPrototypeFn() {
    }
    Object.defineProperty(StaticPrototypeFn, "prototype", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () { }
    }); // always an error
    Object.defineProperty(StaticPrototypeFn.prototype, "prototype", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () { }
    }); // ok
    return StaticPrototypeFn;
}());
var StaticPrototypeFn2 = /** @class */ (function () {
    function StaticPrototypeFn2() {
    }
    Object.defineProperty(StaticPrototypeFn2, FunctionPropertyNames.prototype, {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () { }
    }); // always an error
    Object.defineProperty(StaticPrototypeFn2.prototype, FunctionPropertyNames.prototype, {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () { }
    }); // ok
    return StaticPrototypeFn2;
}());
// caller
var StaticCaller = /** @class */ (function () {
    function StaticCaller() {
        Object.defineProperty(this, "caller", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        }); // ok
    }
    return StaticCaller;
}());
var StaticCaller2 = /** @class */ (function () {
    function StaticCaller2() {
        Object.defineProperty(this, _h, {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        }); // ok
    }
    return StaticCaller2;
}());
_g = FunctionPropertyNames.caller, _h = FunctionPropertyNames.caller;
var StaticCallerFn = /** @class */ (function () {
    function StaticCallerFn() {
    }
    Object.defineProperty(StaticCallerFn, "caller", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () { }
    }); // error without useDefineForClassFields
    Object.defineProperty(StaticCallerFn.prototype, "caller", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () { }
    }); // ok
    return StaticCallerFn;
}());
var StaticCallerFn2 = /** @class */ (function () {
    function StaticCallerFn2() {
    }
    Object.defineProperty(StaticCallerFn2, FunctionPropertyNames.caller, {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () { }
    }); // error without useDefineForClassFields
    Object.defineProperty(StaticCallerFn2.prototype, FunctionPropertyNames.caller, {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () { }
    }); // ok
    return StaticCallerFn2;
}());
// arguments
var StaticArguments = /** @class */ (function () {
    function StaticArguments() {
        Object.defineProperty(this, "arguments", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        }); // ok
    }
    return StaticArguments;
}());
var StaticArguments2 = /** @class */ (function () {
    function StaticArguments2() {
        Object.defineProperty(this, _k, {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        }); // ok
    }
    return StaticArguments2;
}());
_j = FunctionPropertyNames.arguments, _k = FunctionPropertyNames.arguments;
var StaticArgumentsFn = /** @class */ (function () {
    function StaticArgumentsFn() {
    }
    Object.defineProperty(StaticArgumentsFn, "arguments", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () { }
    }); // error without useDefineForClassFields
    Object.defineProperty(StaticArgumentsFn.prototype, "arguments", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () { }
    }); // ok
    return StaticArgumentsFn;
}());
var StaticArgumentsFn2 = /** @class */ (function () {
    function StaticArgumentsFn2() {
    }
    Object.defineProperty(StaticArgumentsFn2, FunctionPropertyNames.arguments, {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () { }
    }); // error without useDefineForClassFields
    Object.defineProperty(StaticArgumentsFn2.prototype, FunctionPropertyNames.arguments, {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () { }
    }); // ok
    return StaticArgumentsFn2;
}());
// === Static properties on anonymous classes ===
// name
var StaticName_Anonymous = /** @class */ (function () {
    function class_1() {
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        }); // ok
    }
    return class_1;
}());
var StaticName_Anonymous2 = (_o = /** @class */ (function () {
        function class_2() {
            Object.defineProperty(this, _m, {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            }); // ok
        }
        return class_2;
    }()),
    _l = FunctionPropertyNames.name,
    _m = FunctionPropertyNames.name,
    _o);
var StaticNameFn_Anonymous = /** @class */ (function () {
    function StaticNameFn_Anonymous() {
    }
    Object.defineProperty(StaticNameFn_Anonymous, "name", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () { }
    }); // error without useDefineForClassFields
    Object.defineProperty(StaticNameFn_Anonymous.prototype, "name", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () { }
    }); // ok
    return StaticNameFn_Anonymous;
}());
var StaticNameFn_Anonymous2 = /** @class */ (function () {
    function StaticNameFn_Anonymous2() {
    }
    Object.defineProperty(StaticNameFn_Anonymous2, FunctionPropertyNames.name, {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () { }
    }); // error without useDefineForClassFields
    Object.defineProperty(StaticNameFn_Anonymous2.prototype, FunctionPropertyNames.name, {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () { }
    }); // ok
    return StaticNameFn_Anonymous2;
}());
// length
var StaticLength_Anonymous = /** @class */ (function () {
    function class_3() {
        Object.defineProperty(this, "length", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        }); // ok
    }
    return class_3;
}());
var StaticLength_Anonymous2 = (_r = /** @class */ (function () {
        function class_4() {
            Object.defineProperty(this, _q, {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            }); // ok
        }
        return class_4;
    }()),
    _p = FunctionPropertyNames.length,
    _q = FunctionPropertyNames.length,
    _r);
var StaticLengthFn_Anonymous = /** @class */ (function () {
    function StaticLengthFn_Anonymous() {
    }
    Object.defineProperty(StaticLengthFn_Anonymous, "length", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () { }
    }); // error without useDefineForClassFields
    Object.defineProperty(StaticLengthFn_Anonymous.prototype, "length", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () { }
    }); // ok
    return StaticLengthFn_Anonymous;
}());
var StaticLengthFn_Anonymous2 = /** @class */ (function () {
    function StaticLengthFn_Anonymous2() {
    }
    Object.defineProperty(StaticLengthFn_Anonymous2, FunctionPropertyNames.length, {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () { }
    }); // error without useDefineForClassFields
    Object.defineProperty(StaticLengthFn_Anonymous2.prototype, FunctionPropertyNames.length, {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () { }
    }); // ok
    return StaticLengthFn_Anonymous2;
}());
// prototype
var StaticPrototype_Anonymous = /** @class */ (function () {
    function class_5() {
        Object.defineProperty(this, "prototype", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        }); // ok
    }
    return class_5;
}());
var StaticPrototype_Anonymous2 = (_u = /** @class */ (function () {
        function class_6() {
            Object.defineProperty(this, _t, {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            }); // ok
        }
        return class_6;
    }()),
    _s = FunctionPropertyNames.prototype,
    _t = FunctionPropertyNames.prototype,
    _u);
var StaticPrototypeFn_Anonymous = /** @class */ (function () {
    function StaticPrototypeFn_Anonymous() {
    }
    Object.defineProperty(StaticPrototypeFn_Anonymous, "prototype", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () { }
    }); // always an error
    Object.defineProperty(StaticPrototypeFn_Anonymous.prototype, "prototype", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () { }
    }); // ok
    return StaticPrototypeFn_Anonymous;
}());
var StaticPrototypeFn_Anonymous2 = /** @class */ (function () {
    function StaticPrototypeFn_Anonymous2() {
    }
    Object.defineProperty(StaticPrototypeFn_Anonymous2, FunctionPropertyNames.prototype, {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () { }
    }); // always an error
    Object.defineProperty(StaticPrototypeFn_Anonymous2.prototype, FunctionPropertyNames.prototype, {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () { }
    }); // ok
    return StaticPrototypeFn_Anonymous2;
}());
// caller
var StaticCaller_Anonymous = /** @class */ (function () {
    function class_7() {
        Object.defineProperty(this, "caller", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        }); // ok
    }
    return class_7;
}());
var StaticCaller_Anonymous2 = (_x = /** @class */ (function () {
        function class_8() {
            Object.defineProperty(this, _w, {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            }); // ok
        }
        return class_8;
    }()),
    _v = FunctionPropertyNames.caller,
    _w = FunctionPropertyNames.caller,
    _x);
var StaticCallerFn_Anonymous = /** @class */ (function () {
    function StaticCallerFn_Anonymous() {
    }
    Object.defineProperty(StaticCallerFn_Anonymous, "caller", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () { }
    }); // error without useDefineForClassFields
    Object.defineProperty(StaticCallerFn_Anonymous.prototype, "caller", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () { }
    }); // ok
    return StaticCallerFn_Anonymous;
}());
var StaticCallerFn_Anonymous2 = /** @class */ (function () {
    function StaticCallerFn_Anonymous2() {
    }
    Object.defineProperty(StaticCallerFn_Anonymous2, FunctionPropertyNames.caller, {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () { }
    }); // error without useDefineForClassFields
    Object.defineProperty(StaticCallerFn_Anonymous2.prototype, FunctionPropertyNames.caller, {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () { }
    }); // ok
    return StaticCallerFn_Anonymous2;
}());
// arguments
var StaticArguments_Anonymous = /** @class */ (function () {
    function class_9() {
        Object.defineProperty(this, "arguments", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        }); // ok
    }
    return class_9;
}());
var StaticArguments_Anonymous2 = (_0 = /** @class */ (function () {
        function class_10() {
            Object.defineProperty(this, _z, {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            }); // ok
        }
        return class_10;
    }()),
    _y = FunctionPropertyNames.arguments,
    _z = FunctionPropertyNames.arguments,
    _0);
var StaticArgumentsFn_Anonymous = /** @class */ (function () {
    function StaticArgumentsFn_Anonymous() {
    }
    Object.defineProperty(StaticArgumentsFn_Anonymous, "arguments", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () { }
    }); // error without useDefineForClassFields
    Object.defineProperty(StaticArgumentsFn_Anonymous.prototype, "arguments", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () { }
    }); // ok
    return StaticArgumentsFn_Anonymous;
}());
var StaticArgumentsFn_Anonymous2 = /** @class */ (function () {
    function StaticArgumentsFn_Anonymous2() {
    }
    Object.defineProperty(StaticArgumentsFn_Anonymous2, FunctionPropertyNames.arguments, {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () { }
    }); // error without useDefineForClassFields
    Object.defineProperty(StaticArgumentsFn_Anonymous2.prototype, FunctionPropertyNames.arguments, {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () { }
    }); // ok
    return StaticArgumentsFn_Anonymous2;
}());
// === Static properties on default exported classes ===
// name
var TestOnDefaultExportedClass_1;
(function (TestOnDefaultExportedClass_1) {
    var StaticName = /** @class */ (function () {
        function StaticName() {
            Object.defineProperty(this, "name", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            }); // ok
        }
        return StaticName;
    }());
})(TestOnDefaultExportedClass_1 || (TestOnDefaultExportedClass_1 = {}));
var ExportedStaticName = /** @class */ (function () {
    function ExportedStaticName() {
        Object.defineProperty(this, _2, {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        }); // ok
    }
    return ExportedStaticName;
}());
exports.ExportedStaticName = ExportedStaticName;
_1 = FunctionPropertyNames.name, _2 = FunctionPropertyNames.name;
var TestOnDefaultExportedClass_2;
(function (TestOnDefaultExportedClass_2) {
    var StaticNameFn = /** @class */ (function () {
        function StaticNameFn() {
        }
        Object.defineProperty(StaticNameFn, "name", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () { }
        }); // error without useDefineForClassFields
        Object.defineProperty(StaticNameFn.prototype, "name", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () { }
        }); // ok
        return StaticNameFn;
    }());
})(TestOnDefaultExportedClass_2 || (TestOnDefaultExportedClass_2 = {}));
var ExportedStaticNameFn = /** @class */ (function () {
    function ExportedStaticNameFn() {
    }
    Object.defineProperty(ExportedStaticNameFn, FunctionPropertyNames.name, {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () { }
    }); // error without useDefineForClassFields
    Object.defineProperty(ExportedStaticNameFn.prototype, FunctionPropertyNames.name, {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () { }
    }); // ok
    return ExportedStaticNameFn;
}());
exports.ExportedStaticNameFn = ExportedStaticNameFn;
// length
var TestOnDefaultExportedClass_3;
(function (TestOnDefaultExportedClass_3) {
    var StaticLength = /** @class */ (function () {
        function StaticLength() {
            Object.defineProperty(this, "length", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            }); // ok
        }
        return StaticLength;
    }());
    TestOnDefaultExportedClass_3.StaticLength = StaticLength;
})(TestOnDefaultExportedClass_3 || (TestOnDefaultExportedClass_3 = {}));
var ExportedStaticLength = /** @class */ (function () {
    function ExportedStaticLength() {
        Object.defineProperty(this, _4, {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        }); // ok
    }
    return ExportedStaticLength;
}());
exports.ExportedStaticLength = ExportedStaticLength;
_3 = FunctionPropertyNames.length, _4 = FunctionPropertyNames.length;
var TestOnDefaultExportedClass_4;
(function (TestOnDefaultExportedClass_4) {
    var StaticLengthFn = /** @class */ (function () {
        function StaticLengthFn() {
        }
        Object.defineProperty(StaticLengthFn, "length", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () { }
        }); // error without useDefineForClassFields
        Object.defineProperty(StaticLengthFn.prototype, "length", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () { }
        }); // ok
        return StaticLengthFn;
    }());
    TestOnDefaultExportedClass_4.StaticLengthFn = StaticLengthFn;
})(TestOnDefaultExportedClass_4 || (TestOnDefaultExportedClass_4 = {}));
var ExportedStaticLengthFn = /** @class */ (function () {
    function ExportedStaticLengthFn() {
    }
    Object.defineProperty(ExportedStaticLengthFn, FunctionPropertyNames.length, {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () { }
    }); // error without useDefineForClassFields
    Object.defineProperty(ExportedStaticLengthFn.prototype, FunctionPropertyNames.length, {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () { }
    }); // ok
    return ExportedStaticLengthFn;
}());
exports.ExportedStaticLengthFn = ExportedStaticLengthFn;
// prototype
var TestOnDefaultExportedClass_5;
(function (TestOnDefaultExportedClass_5) {
    var StaticPrototype = /** @class */ (function () {
        function StaticPrototype() {
            Object.defineProperty(this, "prototype", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            }); // ok
        }
        return StaticPrototype;
    }());
    TestOnDefaultExportedClass_5.StaticPrototype = StaticPrototype;
})(TestOnDefaultExportedClass_5 || (TestOnDefaultExportedClass_5 = {}));
var ExportedStaticPrototype = /** @class */ (function () {
    function ExportedStaticPrototype() {
        Object.defineProperty(this, _6, {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        }); // ok
    }
    return ExportedStaticPrototype;
}());
exports.ExportedStaticPrototype = ExportedStaticPrototype;
_5 = FunctionPropertyNames.prototype, _6 = FunctionPropertyNames.prototype;
var TestOnDefaultExportedClass_6;
(function (TestOnDefaultExportedClass_6) {
    var StaticPrototypeFn = /** @class */ (function () {
        function StaticPrototypeFn() {
        }
        Object.defineProperty(StaticPrototypeFn, "prototype", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () { }
        }); // always an error
        Object.defineProperty(StaticPrototypeFn.prototype, "prototype", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () { }
        }); // ok
        return StaticPrototypeFn;
    }());
    TestOnDefaultExportedClass_6.StaticPrototypeFn = StaticPrototypeFn;
})(TestOnDefaultExportedClass_6 || (TestOnDefaultExportedClass_6 = {}));
var ExportedStaticPrototypeFn = /** @class */ (function () {
    function ExportedStaticPrototypeFn() {
    }
    Object.defineProperty(ExportedStaticPrototypeFn, FunctionPropertyNames.prototype, {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () { }
    }); // always an error
    Object.defineProperty(ExportedStaticPrototypeFn.prototype, FunctionPropertyNames.prototype, {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () { }
    }); // ok
    return ExportedStaticPrototypeFn;
}());
exports.ExportedStaticPrototypeFn = ExportedStaticPrototypeFn;
// caller
var TestOnDefaultExportedClass_7;
(function (TestOnDefaultExportedClass_7) {
    var StaticCaller = /** @class */ (function () {
        function StaticCaller() {
            Object.defineProperty(this, "caller", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            }); // ok
        }
        return StaticCaller;
    }());
    TestOnDefaultExportedClass_7.StaticCaller = StaticCaller;
})(TestOnDefaultExportedClass_7 || (TestOnDefaultExportedClass_7 = {}));
var ExportedStaticCaller = /** @class */ (function () {
    function ExportedStaticCaller() {
        Object.defineProperty(this, _8, {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        }); // ok
    }
    return ExportedStaticCaller;
}());
exports.ExportedStaticCaller = ExportedStaticCaller;
_7 = FunctionPropertyNames.caller, _8 = FunctionPropertyNames.caller;
var TestOnDefaultExportedClass_8;
(function (TestOnDefaultExportedClass_8) {
    var StaticCallerFn = /** @class */ (function () {
        function StaticCallerFn() {
        }
        Object.defineProperty(StaticCallerFn, "caller", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () { }
        }); // error without useDefineForClassFields
        Object.defineProperty(StaticCallerFn.prototype, "caller", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () { }
        }); // ok
        return StaticCallerFn;
    }());
    TestOnDefaultExportedClass_8.StaticCallerFn = StaticCallerFn;
})(TestOnDefaultExportedClass_8 || (TestOnDefaultExportedClass_8 = {}));
var ExportedStaticCallerFn = /** @class */ (function () {
    function ExportedStaticCallerFn() {
    }
    Object.defineProperty(ExportedStaticCallerFn, FunctionPropertyNames.caller, {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () { }
    }); // error without useDefineForClassFields
    Object.defineProperty(ExportedStaticCallerFn.prototype, FunctionPropertyNames.caller, {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () { }
    }); // ok
    return ExportedStaticCallerFn;
}());
exports.ExportedStaticCallerFn = ExportedStaticCallerFn;
// arguments
var TestOnDefaultExportedClass_9;
(function (TestOnDefaultExportedClass_9) {
    var StaticArguments = /** @class */ (function () {
        function StaticArguments() {
            Object.defineProperty(this, "arguments", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            }); // ok
        }
        return StaticArguments;
    }());
    TestOnDefaultExportedClass_9.StaticArguments = StaticArguments;
})(TestOnDefaultExportedClass_9 || (TestOnDefaultExportedClass_9 = {}));
var ExportedStaticArguments = /** @class */ (function () {
    function ExportedStaticArguments() {
        Object.defineProperty(this, _10, {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        }); // ok
    }
    return ExportedStaticArguments;
}());
exports.ExportedStaticArguments = ExportedStaticArguments;
_9 = FunctionPropertyNames.arguments, _10 = FunctionPropertyNames.arguments;
var TestOnDefaultExportedClass_10;
(function (TestOnDefaultExportedClass_10) {
    var StaticArgumentsFn = /** @class */ (function () {
        function StaticArgumentsFn() {
        }
        Object.defineProperty(StaticArgumentsFn, "arguments", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () { }
        }); // error without useDefineForClassFields
        Object.defineProperty(StaticArgumentsFn.prototype, "arguments", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () { }
        }); // ok
        return StaticArgumentsFn;
    }());
    TestOnDefaultExportedClass_10.StaticArgumentsFn = StaticArgumentsFn;
})(TestOnDefaultExportedClass_10 || (TestOnDefaultExportedClass_10 = {}));
var ExportedStaticArgumentsFn = /** @class */ (function () {
    function ExportedStaticArgumentsFn() {
    }
    Object.defineProperty(ExportedStaticArgumentsFn, FunctionPropertyNames.arguments, {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () { }
    }); // error without useDefineForClassFields
    Object.defineProperty(ExportedStaticArgumentsFn.prototype, FunctionPropertyNames.arguments, {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () { }
    }); // ok
    return ExportedStaticArgumentsFn;
}());
exports.ExportedStaticArgumentsFn = ExportedStaticArgumentsFn;
