//// [staticPropertyNameConflicts.ts]
// name
class StaticName {
    static name: number; // error without useDefineForClassFields
    name: string; // ok
}

class StaticNameFn {
    static name() {} // error without useDefineForClassFields
    name() {} // ok
}

// length
class StaticLength {
    static length: number; // error without useDefineForClassFields
    length: string; // ok
}

class StaticLengthFn {
    static length() {} // error without useDefineForClassFields
    length() {} // ok
}

// prototype
class StaticPrototype {
    static prototype: number; // always an error
    prototype: string; // ok
}

class StaticPrototypeFn {
    static prototype() {} // always an error
    prototype() {} // ok
}

// caller
class StaticCaller {
    static caller: number; // error without useDefineForClassFields
    caller: string; // ok
}

class StaticCallerFn {
    static caller() {} // error without useDefineForClassFields
    caller() {} // ok
}

// arguments
class StaticArguments {
    static arguments: number; // error without useDefineForClassFields
    arguments: string; // ok
}

class StaticArgumentsFn {
    static arguments() {} // error without useDefineForClassFields
    arguments() {} // ok
}



// === Static properties on anonymous classes ===

// name
var StaticName_Anonymous = class {
    static name: number; // error without useDefineForClassFields
    name: string; // ok
}

var StaticNameFn_Anonymous = class {
    static name() {} // error without useDefineForClassFields
    name() {} // ok
}

// length
var StaticLength_Anonymous = class {
    static length: number; // error without useDefineForClassFields
    length: string; // ok
}

var StaticLengthFn_Anonymous = class {
    static length() {} // error without useDefineForClassFields
    length() {} // ok
}

// prototype
var StaticPrototype_Anonymous = class {
    static prototype: number; // always an error
    prototype: string; // ok
}

var StaticPrototypeFn_Anonymous = class {
    static prototype() {} // always an error
    prototype() {} // ok
}

// caller
var StaticCaller_Anonymous = class {
    static caller: number; // error without useDefineForClassFields
    caller: string; // ok
}

var StaticCallerFn_Anonymous = class {
    static caller() {} // error without useDefineForClassFields
    caller() {} // ok
}

// arguments
var StaticArguments_Anonymous = class {
    static arguments: number; // error without useDefineForClassFields
    arguments: string; // ok
}

var StaticArgumentsFn_Anonymous = class {
    static arguments() {} // error without useDefineForClassFields
    arguments() {} // ok
}


// === Static properties on default exported classes ===

// name
module TestOnDefaultExportedClass_1 {
    class StaticName {
        static name: number; // error without useDefineForClassFields
        name: string; // ok
    }
}

module TestOnDefaultExportedClass_2 {
    class StaticNameFn {
        static name() {} // error without useDefineForClassFields
        name() {} // ok
    }
}

// length
module TestOnDefaultExportedClass_3 {
    export default class StaticLength {
        static length: number; // error without useDefineForClassFields
        length: string; // ok
    }
}

module TestOnDefaultExportedClass_4 {
    export default class StaticLengthFn {
        static length() {} // error without useDefineForClassFields
        length() {} // ok
    }
}

// prototype
module TestOnDefaultExportedClass_5 {
    export default class StaticPrototype {
        static prototype: number; // always an error
        prototype: string; // ok
    }
}

module TestOnDefaultExportedClass_6 {
    export default class StaticPrototypeFn {
        static prototype() {} // always an error
        prototype() {} // ok
    }
}

// caller
module TestOnDefaultExportedClass_7 {
    export default class StaticCaller {
        static caller: number; // error without useDefineForClassFields
        caller: string; // ok
    }
}

module TestOnDefaultExportedClass_8 {
    export default class StaticCallerFn {
        static caller() {} // error without useDefineForClassFields
        caller() {} // ok
    }
}

// arguments
module TestOnDefaultExportedClass_9 {
    export default class StaticArguments {
        static arguments: number; // error without useDefineForClassFields
        arguments: string; // ok
    }
}

module TestOnDefaultExportedClass_10 {
    export default class StaticArgumentsFn {
        static arguments() {} // error without useDefineForClassFields
        arguments() {} // ok
    }
}


//// [staticPropertyNameConflicts.js]
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
// length
var StaticLength_Anonymous = /** @class */ (function () {
    function class_2() {
        Object.defineProperty(this, "length", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        }); // ok
    }
    return class_2;
}());
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
// prototype
var StaticPrototype_Anonymous = /** @class */ (function () {
    function class_3() {
        Object.defineProperty(this, "prototype", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        }); // ok
    }
    return class_3;
}());
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
// caller
var StaticCaller_Anonymous = /** @class */ (function () {
    function class_4() {
        Object.defineProperty(this, "caller", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        }); // ok
    }
    return class_4;
}());
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
// arguments
var StaticArguments_Anonymous = /** @class */ (function () {
    function class_5() {
        Object.defineProperty(this, "arguments", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        }); // ok
    }
    return class_5;
}());
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
