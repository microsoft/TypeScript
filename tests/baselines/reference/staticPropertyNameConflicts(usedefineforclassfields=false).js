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
var _a, _b, _c, _d, _e;
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
    }
    return StaticName;
}());
var StaticName2 = /** @class */ (function () {
    function StaticName2() {
    }
    return StaticName2;
}());
FunctionPropertyNames.name, FunctionPropertyNames.name;
var StaticNameFn = /** @class */ (function () {
    function StaticNameFn() {
    }
    StaticNameFn.name = function () { }; // error without useDefineForClassFields
    StaticNameFn.prototype.name = function () { }; // ok
    return StaticNameFn;
}());
var StaticNameFn2 = /** @class */ (function () {
    function StaticNameFn2() {
    }
    StaticNameFn2[FunctionPropertyNames.name] = function () { }; // error without useDefineForClassFields
    StaticNameFn2.prototype[FunctionPropertyNames.name] = function () { }; // ok
    return StaticNameFn2;
}());
// length
var StaticLength = /** @class */ (function () {
    function StaticLength() {
    }
    return StaticLength;
}());
var StaticLength2 = /** @class */ (function () {
    function StaticLength2() {
    }
    return StaticLength2;
}());
FunctionPropertyNames.length, FunctionPropertyNames.length;
var StaticLengthFn = /** @class */ (function () {
    function StaticLengthFn() {
    }
    StaticLengthFn.length = function () { }; // error without useDefineForClassFields
    StaticLengthFn.prototype.length = function () { }; // ok
    return StaticLengthFn;
}());
var StaticLengthFn2 = /** @class */ (function () {
    function StaticLengthFn2() {
    }
    StaticLengthFn2[FunctionPropertyNames.length] = function () { }; // error without useDefineForClassFields
    StaticLengthFn2.prototype[FunctionPropertyNames.length] = function () { }; // ok
    return StaticLengthFn2;
}());
// prototype
var StaticPrototype = /** @class */ (function () {
    function StaticPrototype() {
    }
    return StaticPrototype;
}());
var StaticPrototype2 = /** @class */ (function () {
    function StaticPrototype2() {
    }
    return StaticPrototype2;
}());
FunctionPropertyNames.prototype, FunctionPropertyNames.prototype;
var StaticPrototypeFn = /** @class */ (function () {
    function StaticPrototypeFn() {
    }
    StaticPrototypeFn.prototype = function () { }; // always an error
    StaticPrototypeFn.prototype.prototype = function () { }; // ok
    return StaticPrototypeFn;
}());
var StaticPrototypeFn2 = /** @class */ (function () {
    function StaticPrototypeFn2() {
    }
    StaticPrototypeFn2[FunctionPropertyNames.prototype] = function () { }; // always an error
    StaticPrototypeFn2.prototype[FunctionPropertyNames.prototype] = function () { }; // ok
    return StaticPrototypeFn2;
}());
// caller
var StaticCaller = /** @class */ (function () {
    function StaticCaller() {
    }
    return StaticCaller;
}());
var StaticCaller2 = /** @class */ (function () {
    function StaticCaller2() {
    }
    return StaticCaller2;
}());
FunctionPropertyNames.caller, FunctionPropertyNames.caller;
var StaticCallerFn = /** @class */ (function () {
    function StaticCallerFn() {
    }
    StaticCallerFn.caller = function () { }; // error without useDefineForClassFields
    StaticCallerFn.prototype.caller = function () { }; // ok
    return StaticCallerFn;
}());
var StaticCallerFn2 = /** @class */ (function () {
    function StaticCallerFn2() {
    }
    StaticCallerFn2[FunctionPropertyNames.caller] = function () { }; // error without useDefineForClassFields
    StaticCallerFn2.prototype[FunctionPropertyNames.caller] = function () { }; // ok
    return StaticCallerFn2;
}());
// arguments
var StaticArguments = /** @class */ (function () {
    function StaticArguments() {
    }
    return StaticArguments;
}());
var StaticArguments2 = /** @class */ (function () {
    function StaticArguments2() {
    }
    return StaticArguments2;
}());
FunctionPropertyNames.arguments, FunctionPropertyNames.arguments;
var StaticArgumentsFn = /** @class */ (function () {
    function StaticArgumentsFn() {
    }
    StaticArgumentsFn.arguments = function () { }; // error without useDefineForClassFields
    StaticArgumentsFn.prototype.arguments = function () { }; // ok
    return StaticArgumentsFn;
}());
var StaticArgumentsFn2 = /** @class */ (function () {
    function StaticArgumentsFn2() {
    }
    StaticArgumentsFn2[FunctionPropertyNames.arguments] = function () { }; // error without useDefineForClassFields
    StaticArgumentsFn2.prototype[FunctionPropertyNames.arguments] = function () { }; // ok
    return StaticArgumentsFn2;
}());
// === Static properties on anonymous classes ===
// name
var StaticName_Anonymous = /** @class */ (function () {
    function class_1() {
    }
    return class_1;
}());
var StaticName_Anonymous2 = (_a = /** @class */ (function () {
        function class_2() {
        }
        return class_2;
    }()),
    FunctionPropertyNames.name,
    FunctionPropertyNames.name,
    _a);
var StaticNameFn_Anonymous = /** @class */ (function () {
    function StaticNameFn_Anonymous() {
    }
    StaticNameFn_Anonymous.name = function () { }; // error without useDefineForClassFields
    StaticNameFn_Anonymous.prototype.name = function () { }; // ok
    return StaticNameFn_Anonymous;
}());
var StaticNameFn_Anonymous2 = /** @class */ (function () {
    function StaticNameFn_Anonymous2() {
    }
    StaticNameFn_Anonymous2[FunctionPropertyNames.name] = function () { }; // error without useDefineForClassFields
    StaticNameFn_Anonymous2.prototype[FunctionPropertyNames.name] = function () { }; // ok
    return StaticNameFn_Anonymous2;
}());
// length
var StaticLength_Anonymous = /** @class */ (function () {
    function class_3() {
    }
    return class_3;
}());
var StaticLength_Anonymous2 = (_b = /** @class */ (function () {
        function class_4() {
        }
        return class_4;
    }()),
    FunctionPropertyNames.length,
    FunctionPropertyNames.length,
    _b);
var StaticLengthFn_Anonymous = /** @class */ (function () {
    function StaticLengthFn_Anonymous() {
    }
    StaticLengthFn_Anonymous.length = function () { }; // error without useDefineForClassFields
    StaticLengthFn_Anonymous.prototype.length = function () { }; // ok
    return StaticLengthFn_Anonymous;
}());
var StaticLengthFn_Anonymous2 = /** @class */ (function () {
    function StaticLengthFn_Anonymous2() {
    }
    StaticLengthFn_Anonymous2[FunctionPropertyNames.length] = function () { }; // error without useDefineForClassFields
    StaticLengthFn_Anonymous2.prototype[FunctionPropertyNames.length] = function () { }; // ok
    return StaticLengthFn_Anonymous2;
}());
// prototype
var StaticPrototype_Anonymous = /** @class */ (function () {
    function class_5() {
    }
    return class_5;
}());
var StaticPrototype_Anonymous2 = (_c = /** @class */ (function () {
        function class_6() {
        }
        return class_6;
    }()),
    FunctionPropertyNames.prototype,
    FunctionPropertyNames.prototype,
    _c);
var StaticPrototypeFn_Anonymous = /** @class */ (function () {
    function StaticPrototypeFn_Anonymous() {
    }
    StaticPrototypeFn_Anonymous.prototype = function () { }; // always an error
    StaticPrototypeFn_Anonymous.prototype.prototype = function () { }; // ok
    return StaticPrototypeFn_Anonymous;
}());
var StaticPrototypeFn_Anonymous2 = /** @class */ (function () {
    function StaticPrototypeFn_Anonymous2() {
    }
    StaticPrototypeFn_Anonymous2[FunctionPropertyNames.prototype] = function () { }; // always an error
    StaticPrototypeFn_Anonymous2.prototype[FunctionPropertyNames.prototype] = function () { }; // ok
    return StaticPrototypeFn_Anonymous2;
}());
// caller
var StaticCaller_Anonymous = /** @class */ (function () {
    function class_7() {
    }
    return class_7;
}());
var StaticCaller_Anonymous2 = (_d = /** @class */ (function () {
        function class_8() {
        }
        return class_8;
    }()),
    FunctionPropertyNames.caller,
    FunctionPropertyNames.caller,
    _d);
var StaticCallerFn_Anonymous = /** @class */ (function () {
    function StaticCallerFn_Anonymous() {
    }
    StaticCallerFn_Anonymous.caller = function () { }; // error without useDefineForClassFields
    StaticCallerFn_Anonymous.prototype.caller = function () { }; // ok
    return StaticCallerFn_Anonymous;
}());
var StaticCallerFn_Anonymous2 = /** @class */ (function () {
    function StaticCallerFn_Anonymous2() {
    }
    StaticCallerFn_Anonymous2[FunctionPropertyNames.caller] = function () { }; // error without useDefineForClassFields
    StaticCallerFn_Anonymous2.prototype[FunctionPropertyNames.caller] = function () { }; // ok
    return StaticCallerFn_Anonymous2;
}());
// arguments
var StaticArguments_Anonymous = /** @class */ (function () {
    function class_9() {
    }
    return class_9;
}());
var StaticArguments_Anonymous2 = (_e = /** @class */ (function () {
        function class_10() {
        }
        return class_10;
    }()),
    FunctionPropertyNames.arguments,
    FunctionPropertyNames.arguments,
    _e);
var StaticArgumentsFn_Anonymous = /** @class */ (function () {
    function StaticArgumentsFn_Anonymous() {
    }
    StaticArgumentsFn_Anonymous.arguments = function () { }; // error without useDefineForClassFields
    StaticArgumentsFn_Anonymous.prototype.arguments = function () { }; // ok
    return StaticArgumentsFn_Anonymous;
}());
var StaticArgumentsFn_Anonymous2 = /** @class */ (function () {
    function StaticArgumentsFn_Anonymous2() {
    }
    StaticArgumentsFn_Anonymous2[FunctionPropertyNames.arguments] = function () { }; // error without useDefineForClassFields
    StaticArgumentsFn_Anonymous2.prototype[FunctionPropertyNames.arguments] = function () { }; // ok
    return StaticArgumentsFn_Anonymous2;
}());
// === Static properties on default exported classes ===
// name
var TestOnDefaultExportedClass_1;
(function (TestOnDefaultExportedClass_1) {
    var StaticName = /** @class */ (function () {
        function StaticName() {
        }
        return StaticName;
    }());
})(TestOnDefaultExportedClass_1 || (TestOnDefaultExportedClass_1 = {}));
var ExportedStaticName = /** @class */ (function () {
    function ExportedStaticName() {
    }
    return ExportedStaticName;
}());
exports.ExportedStaticName = ExportedStaticName;
FunctionPropertyNames.name, FunctionPropertyNames.name;
var TestOnDefaultExportedClass_2;
(function (TestOnDefaultExportedClass_2) {
    var StaticNameFn = /** @class */ (function () {
        function StaticNameFn() {
        }
        StaticNameFn.name = function () { }; // error without useDefineForClassFields
        StaticNameFn.prototype.name = function () { }; // ok
        return StaticNameFn;
    }());
})(TestOnDefaultExportedClass_2 || (TestOnDefaultExportedClass_2 = {}));
var ExportedStaticNameFn = /** @class */ (function () {
    function ExportedStaticNameFn() {
    }
    ExportedStaticNameFn[FunctionPropertyNames.name] = function () { }; // error without useDefineForClassFields
    ExportedStaticNameFn.prototype[FunctionPropertyNames.name] = function () { }; // ok
    return ExportedStaticNameFn;
}());
exports.ExportedStaticNameFn = ExportedStaticNameFn;
// length
var TestOnDefaultExportedClass_3;
(function (TestOnDefaultExportedClass_3) {
    var StaticLength = /** @class */ (function () {
        function StaticLength() {
        }
        return StaticLength;
    }());
    TestOnDefaultExportedClass_3.StaticLength = StaticLength;
})(TestOnDefaultExportedClass_3 || (TestOnDefaultExportedClass_3 = {}));
var ExportedStaticLength = /** @class */ (function () {
    function ExportedStaticLength() {
    }
    return ExportedStaticLength;
}());
exports.ExportedStaticLength = ExportedStaticLength;
FunctionPropertyNames.length, FunctionPropertyNames.length;
var TestOnDefaultExportedClass_4;
(function (TestOnDefaultExportedClass_4) {
    var StaticLengthFn = /** @class */ (function () {
        function StaticLengthFn() {
        }
        StaticLengthFn.length = function () { }; // error without useDefineForClassFields
        StaticLengthFn.prototype.length = function () { }; // ok
        return StaticLengthFn;
    }());
    TestOnDefaultExportedClass_4.StaticLengthFn = StaticLengthFn;
})(TestOnDefaultExportedClass_4 || (TestOnDefaultExportedClass_4 = {}));
var ExportedStaticLengthFn = /** @class */ (function () {
    function ExportedStaticLengthFn() {
    }
    ExportedStaticLengthFn[FunctionPropertyNames.length] = function () { }; // error without useDefineForClassFields
    ExportedStaticLengthFn.prototype[FunctionPropertyNames.length] = function () { }; // ok
    return ExportedStaticLengthFn;
}());
exports.ExportedStaticLengthFn = ExportedStaticLengthFn;
// prototype
var TestOnDefaultExportedClass_5;
(function (TestOnDefaultExportedClass_5) {
    var StaticPrototype = /** @class */ (function () {
        function StaticPrototype() {
        }
        return StaticPrototype;
    }());
    TestOnDefaultExportedClass_5.StaticPrototype = StaticPrototype;
})(TestOnDefaultExportedClass_5 || (TestOnDefaultExportedClass_5 = {}));
var ExportedStaticPrototype = /** @class */ (function () {
    function ExportedStaticPrototype() {
    }
    return ExportedStaticPrototype;
}());
exports.ExportedStaticPrototype = ExportedStaticPrototype;
FunctionPropertyNames.prototype, FunctionPropertyNames.prototype;
var TestOnDefaultExportedClass_6;
(function (TestOnDefaultExportedClass_6) {
    var StaticPrototypeFn = /** @class */ (function () {
        function StaticPrototypeFn() {
        }
        StaticPrototypeFn.prototype = function () { }; // always an error
        StaticPrototypeFn.prototype.prototype = function () { }; // ok
        return StaticPrototypeFn;
    }());
    TestOnDefaultExportedClass_6.StaticPrototypeFn = StaticPrototypeFn;
})(TestOnDefaultExportedClass_6 || (TestOnDefaultExportedClass_6 = {}));
var ExportedStaticPrototypeFn = /** @class */ (function () {
    function ExportedStaticPrototypeFn() {
    }
    ExportedStaticPrototypeFn[FunctionPropertyNames.prototype] = function () { }; // always an error
    ExportedStaticPrototypeFn.prototype[FunctionPropertyNames.prototype] = function () { }; // ok
    return ExportedStaticPrototypeFn;
}());
exports.ExportedStaticPrototypeFn = ExportedStaticPrototypeFn;
// caller
var TestOnDefaultExportedClass_7;
(function (TestOnDefaultExportedClass_7) {
    var StaticCaller = /** @class */ (function () {
        function StaticCaller() {
        }
        return StaticCaller;
    }());
    TestOnDefaultExportedClass_7.StaticCaller = StaticCaller;
})(TestOnDefaultExportedClass_7 || (TestOnDefaultExportedClass_7 = {}));
var ExportedStaticCaller = /** @class */ (function () {
    function ExportedStaticCaller() {
    }
    return ExportedStaticCaller;
}());
exports.ExportedStaticCaller = ExportedStaticCaller;
FunctionPropertyNames.caller, FunctionPropertyNames.caller;
var TestOnDefaultExportedClass_8;
(function (TestOnDefaultExportedClass_8) {
    var StaticCallerFn = /** @class */ (function () {
        function StaticCallerFn() {
        }
        StaticCallerFn.caller = function () { }; // error without useDefineForClassFields
        StaticCallerFn.prototype.caller = function () { }; // ok
        return StaticCallerFn;
    }());
    TestOnDefaultExportedClass_8.StaticCallerFn = StaticCallerFn;
})(TestOnDefaultExportedClass_8 || (TestOnDefaultExportedClass_8 = {}));
var ExportedStaticCallerFn = /** @class */ (function () {
    function ExportedStaticCallerFn() {
    }
    ExportedStaticCallerFn[FunctionPropertyNames.caller] = function () { }; // error without useDefineForClassFields
    ExportedStaticCallerFn.prototype[FunctionPropertyNames.caller] = function () { }; // ok
    return ExportedStaticCallerFn;
}());
exports.ExportedStaticCallerFn = ExportedStaticCallerFn;
// arguments
var TestOnDefaultExportedClass_9;
(function (TestOnDefaultExportedClass_9) {
    var StaticArguments = /** @class */ (function () {
        function StaticArguments() {
        }
        return StaticArguments;
    }());
    TestOnDefaultExportedClass_9.StaticArguments = StaticArguments;
})(TestOnDefaultExportedClass_9 || (TestOnDefaultExportedClass_9 = {}));
var ExportedStaticArguments = /** @class */ (function () {
    function ExportedStaticArguments() {
    }
    return ExportedStaticArguments;
}());
exports.ExportedStaticArguments = ExportedStaticArguments;
FunctionPropertyNames.arguments, FunctionPropertyNames.arguments;
var TestOnDefaultExportedClass_10;
(function (TestOnDefaultExportedClass_10) {
    var StaticArgumentsFn = /** @class */ (function () {
        function StaticArgumentsFn() {
        }
        StaticArgumentsFn.arguments = function () { }; // error without useDefineForClassFields
        StaticArgumentsFn.prototype.arguments = function () { }; // ok
        return StaticArgumentsFn;
    }());
    TestOnDefaultExportedClass_10.StaticArgumentsFn = StaticArgumentsFn;
})(TestOnDefaultExportedClass_10 || (TestOnDefaultExportedClass_10 = {}));
var ExportedStaticArgumentsFn = /** @class */ (function () {
    function ExportedStaticArgumentsFn() {
    }
    ExportedStaticArgumentsFn[FunctionPropertyNames.arguments] = function () { }; // error without useDefineForClassFields
    ExportedStaticArgumentsFn.prototype[FunctionPropertyNames.arguments] = function () { }; // ok
    return ExportedStaticArgumentsFn;
}());
exports.ExportedStaticArgumentsFn = ExportedStaticArgumentsFn;
