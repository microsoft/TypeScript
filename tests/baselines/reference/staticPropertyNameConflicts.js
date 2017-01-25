//// [staticPropertyNameConflicts.ts]
// name
class StaticName {
    static name: number; // error
    name: string; // ok
}

class StaticNameFn {
    static name() {} // error
    name() {} // ok
}

// length
class StaticLength {
    static length: number; // error
    length: string; // ok
}

class StaticLengthFn {
    static length() {} // error
    length() {} // ok
}

// prototype
class StaticPrototype {
    static prototype: number; // error
    prototype: string; // ok
}

class StaticPrototypeFn {
    static prototype() {} // error
    prototype() {} // ok
}

// caller
class StaticCaller {
    static caller: number; // error
    caller: string; // ok
}

class StaticCallerFn {
    static caller() {} // error
    caller() {} // ok
}

// arguments
class StaticArguments {
    static arguments: number; // error
    arguments: string; // ok
}

class StaticArgumentsFn {
    static arguments() {} // error
    arguments() {} // ok
}



// === Static properties on anonymous classes ===

// name
var StaticName_Anonymous = class {
    static name: number; // error
    name: string; // ok
}

var StaticNameFn_Anonymous = class {
    static name() {} // error
    name() {} // ok
}

// length
var StaticLength_Anonymous = class {
    static length: number; // error
    length: string; // ok
}

var StaticLengthFn_Anonymous = class {
    static length() {} // error
    length() {} // ok
}

// prototype
var StaticPrototype_Anonymous = class {
    static prototype: number; // error
    prototype: string; // ok
}

var StaticPrototypeFn_Anonymous = class {
    static prototype() {} // error
    prototype() {} // ok
}

// caller
var StaticCaller_Anonymous = class {
    static caller: number; // error
    caller: string; // ok
}

var StaticCallerFn_Anonymous = class {
    static caller() {} // error
    caller() {} // ok
}

// arguments
var StaticArguments_Anonymous = class {
    static arguments: number; // error
    arguments: string; // ok
}

var StaticArgumentsFn_Anonymous = class {
    static arguments() {} // error
    arguments() {} // ok
}


// === Static properties on default exported classes ===

// name
module TestOnDefaultExportedClass_1 {
    class StaticName {
        static name: number; // error
        name: string; // ok
    }
}

module TestOnDefaultExportedClass_2 {
    class StaticNameFn {
        static name() {} // error
        name() {} // ok
    }
}

// length
module TestOnDefaultExportedClass_3 {
    export default class StaticLength {
        static length: number; // error
        length: string; // ok
    }
}

module TestOnDefaultExportedClass_4 {
    export default class StaticLengthFn {
        static length() {} // error
        length() {} // ok
    }
}

// prototype
module TestOnDefaultExportedClass_5 {    
    export default class StaticPrototype {
        static prototype: number; // error
        prototype: string; // ok
    }
}

module TestOnDefaultExportedClass_6 {
    export default class StaticPrototypeFn {
        static prototype() {} // error
        prototype() {} // ok
    }
}

// caller
module TestOnDefaultExportedClass_7 {
    export default class StaticCaller {
        static caller: number; // error
        caller: string; // ok
    }
}

module TestOnDefaultExportedClass_8 {
    export default class StaticCallerFn {
        static caller() {} // error
        caller() {} // ok
    }
}

// arguments
module TestOnDefaultExportedClass_9 {
    export default class StaticArguments {
        static arguments: number; // error
        arguments: string; // ok
    }
}

module TestOnDefaultExportedClass_10 {
    export default class StaticArgumentsFn {
        static arguments() {} // error
        arguments() {} // ok
    }
}

//// [staticPropertyNameConflicts.js]
// name
var StaticName = (function () {
    function StaticName() {
    }
    return StaticName;
}());
var StaticNameFn = (function () {
    function StaticNameFn() {
    }
    StaticNameFn.name = function () { }; // error
    StaticNameFn.prototype.name = function () { }; // ok
    return StaticNameFn;
}());
// length
var StaticLength = (function () {
    function StaticLength() {
    }
    return StaticLength;
}());
var StaticLengthFn = (function () {
    function StaticLengthFn() {
    }
    StaticLengthFn.length = function () { }; // error
    StaticLengthFn.prototype.length = function () { }; // ok
    return StaticLengthFn;
}());
// prototype
var StaticPrototype = (function () {
    function StaticPrototype() {
    }
    return StaticPrototype;
}());
var StaticPrototypeFn = (function () {
    function StaticPrototypeFn() {
    }
    StaticPrototypeFn.prototype = function () { }; // error
    StaticPrototypeFn.prototype.prototype = function () { }; // ok
    return StaticPrototypeFn;
}());
// caller
var StaticCaller = (function () {
    function StaticCaller() {
    }
    return StaticCaller;
}());
var StaticCallerFn = (function () {
    function StaticCallerFn() {
    }
    StaticCallerFn.caller = function () { }; // error
    StaticCallerFn.prototype.caller = function () { }; // ok
    return StaticCallerFn;
}());
// arguments
var StaticArguments = (function () {
    function StaticArguments() {
    }
    return StaticArguments;
}());
var StaticArgumentsFn = (function () {
    function StaticArgumentsFn() {
    }
    StaticArgumentsFn.arguments = function () { }; // error
    StaticArgumentsFn.prototype.arguments = function () { }; // ok
    return StaticArgumentsFn;
}());
// === Static properties on anonymous classes ===
// name
var StaticName_Anonymous = (function () {
    function class_1() {
    }
    return class_1;
}());
var StaticNameFn_Anonymous = (function () {
    function class_2() {
    }
    class_2.name = function () { }; // error
    class_2.prototype.name = function () { }; // ok
    return class_2;
}());
// length
var StaticLength_Anonymous = (function () {
    function class_3() {
    }
    return class_3;
}());
var StaticLengthFn_Anonymous = (function () {
    function class_4() {
    }
    class_4.length = function () { }; // error
    class_4.prototype.length = function () { }; // ok
    return class_4;
}());
// prototype
var StaticPrototype_Anonymous = (function () {
    function class_5() {
    }
    return class_5;
}());
var StaticPrototypeFn_Anonymous = (function () {
    function class_6() {
    }
    class_6.prototype = function () { }; // error
    class_6.prototype.prototype = function () { }; // ok
    return class_6;
}());
// caller
var StaticCaller_Anonymous = (function () {
    function class_7() {
    }
    return class_7;
}());
var StaticCallerFn_Anonymous = (function () {
    function class_8() {
    }
    class_8.caller = function () { }; // error
    class_8.prototype.caller = function () { }; // ok
    return class_8;
}());
// arguments
var StaticArguments_Anonymous = (function () {
    function class_9() {
    }
    return class_9;
}());
var StaticArgumentsFn_Anonymous = (function () {
    function class_10() {
    }
    class_10.arguments = function () { }; // error
    class_10.prototype.arguments = function () { }; // ok
    return class_10;
}());
// === Static properties on default exported classes ===
// name
var TestOnDefaultExportedClass_1;
(function (TestOnDefaultExportedClass_1) {
    var StaticName = (function () {
        function StaticName() {
        }
        return StaticName;
    }());
})(TestOnDefaultExportedClass_1 || (TestOnDefaultExportedClass_1 = {}));
var TestOnDefaultExportedClass_2;
(function (TestOnDefaultExportedClass_2) {
    var StaticNameFn = (function () {
        function StaticNameFn() {
        }
        StaticNameFn.name = function () { }; // error
        StaticNameFn.prototype.name = function () { }; // ok
        return StaticNameFn;
    }());
})(TestOnDefaultExportedClass_2 || (TestOnDefaultExportedClass_2 = {}));
// length
var TestOnDefaultExportedClass_3;
(function (TestOnDefaultExportedClass_3) {
    var StaticLength = (function () {
        function StaticLength() {
        }
        return StaticLength;
    }());
    TestOnDefaultExportedClass_3.StaticLength = StaticLength;
})(TestOnDefaultExportedClass_3 || (TestOnDefaultExportedClass_3 = {}));
var TestOnDefaultExportedClass_4;
(function (TestOnDefaultExportedClass_4) {
    var StaticLengthFn = (function () {
        function StaticLengthFn() {
        }
        StaticLengthFn.length = function () { }; // error
        StaticLengthFn.prototype.length = function () { }; // ok
        return StaticLengthFn;
    }());
    TestOnDefaultExportedClass_4.StaticLengthFn = StaticLengthFn;
})(TestOnDefaultExportedClass_4 || (TestOnDefaultExportedClass_4 = {}));
// prototype
var TestOnDefaultExportedClass_5;
(function (TestOnDefaultExportedClass_5) {
    var StaticPrototype = (function () {
        function StaticPrototype() {
        }
        return StaticPrototype;
    }());
    TestOnDefaultExportedClass_5.StaticPrototype = StaticPrototype;
})(TestOnDefaultExportedClass_5 || (TestOnDefaultExportedClass_5 = {}));
var TestOnDefaultExportedClass_6;
(function (TestOnDefaultExportedClass_6) {
    var StaticPrototypeFn = (function () {
        function StaticPrototypeFn() {
        }
        StaticPrototypeFn.prototype = function () { }; // error
        StaticPrototypeFn.prototype.prototype = function () { }; // ok
        return StaticPrototypeFn;
    }());
    TestOnDefaultExportedClass_6.StaticPrototypeFn = StaticPrototypeFn;
})(TestOnDefaultExportedClass_6 || (TestOnDefaultExportedClass_6 = {}));
// caller
var TestOnDefaultExportedClass_7;
(function (TestOnDefaultExportedClass_7) {
    var StaticCaller = (function () {
        function StaticCaller() {
        }
        return StaticCaller;
    }());
    TestOnDefaultExportedClass_7.StaticCaller = StaticCaller;
})(TestOnDefaultExportedClass_7 || (TestOnDefaultExportedClass_7 = {}));
var TestOnDefaultExportedClass_8;
(function (TestOnDefaultExportedClass_8) {
    var StaticCallerFn = (function () {
        function StaticCallerFn() {
        }
        StaticCallerFn.caller = function () { }; // error
        StaticCallerFn.prototype.caller = function () { }; // ok
        return StaticCallerFn;
    }());
    TestOnDefaultExportedClass_8.StaticCallerFn = StaticCallerFn;
})(TestOnDefaultExportedClass_8 || (TestOnDefaultExportedClass_8 = {}));
// arguments
var TestOnDefaultExportedClass_9;
(function (TestOnDefaultExportedClass_9) {
    var StaticArguments = (function () {
        function StaticArguments() {
        }
        return StaticArguments;
    }());
    TestOnDefaultExportedClass_9.StaticArguments = StaticArguments;
})(TestOnDefaultExportedClass_9 || (TestOnDefaultExportedClass_9 = {}));
var TestOnDefaultExportedClass_10;
(function (TestOnDefaultExportedClass_10) {
    var StaticArgumentsFn = (function () {
        function StaticArgumentsFn() {
        }
        StaticArgumentsFn.arguments = function () { }; // error
        StaticArgumentsFn.prototype.arguments = function () { }; // ok
        return StaticArgumentsFn;
    }());
    TestOnDefaultExportedClass_10.StaticArgumentsFn = StaticArgumentsFn;
})(TestOnDefaultExportedClass_10 || (TestOnDefaultExportedClass_10 = {}));
