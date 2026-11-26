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
namespace TestOnDefaultExportedClass_1 {
    class StaticName {
        static name: number; // error without useDefineForClassFields
        name: string; // ok
    }
}

export class ExportedStaticName {
    static [FunctionPropertyNames.name]: number; // error without useDefineForClassFields
    [FunctionPropertyNames.name]: string; // ok
}

namespace TestOnDefaultExportedClass_2 {
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
namespace TestOnDefaultExportedClass_3 {
    export default class StaticLength {
        static length: number; // error without useDefineForClassFields
        length: string; // ok
    }
}

export class ExportedStaticLength {
    static [FunctionPropertyNames.length]: number; // error without useDefineForClassFields
    [FunctionPropertyNames.length]: string; // ok
}

namespace TestOnDefaultExportedClass_4 {
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
namespace TestOnDefaultExportedClass_5 {
    export default class StaticPrototype {
        static prototype: number; // always an error
        prototype: string; // ok
    }
}

export class ExportedStaticPrototype {
    static [FunctionPropertyNames.prototype]: number; // always an error
    [FunctionPropertyNames.prototype]: string; // ok
}

namespace TestOnDefaultExportedClass_6 {
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
namespace TestOnDefaultExportedClass_7 {
    export default class StaticCaller {
        static caller: number; // error without useDefineForClassFields
        caller: string; // ok
    }
}

export class ExportedStaticCaller {
    static [FunctionPropertyNames.caller]: number; // error without useDefineForClassFields
    [FunctionPropertyNames.caller]: string; // ok
}

namespace TestOnDefaultExportedClass_8 {
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
namespace TestOnDefaultExportedClass_9 {
    export default class StaticArguments {
        static arguments: number; // error without useDefineForClassFields
        arguments: string; // ok
    }
}

export class ExportedStaticArguments {
    static [FunctionPropertyNames.arguments]: number; // error without useDefineForClassFields
    [FunctionPropertyNames.arguments]: string; // ok
}

namespace TestOnDefaultExportedClass_10 {
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10;
const FunctionPropertyNames = {
    name: 'name',
    length: 'length',
    prototype: 'prototype',
    caller: 'caller',
    arguments: 'arguments',
};
// name
class StaticName {
    constructor() {
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        }); // ok
    }
}
class StaticName2 {
    constructor() {
        Object.defineProperty(this, _b, {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        }); // ok
    }
}
_a = FunctionPropertyNames.name, _b = FunctionPropertyNames.name;
class StaticNameFn {
    static name() { } // error without useDefineForClassFields
    name() { } // ok
}
class StaticNameFn2 {
    static [FunctionPropertyNames.name]() { } // error without useDefineForClassFields
    [FunctionPropertyNames.name]() { } // ok
}
// length
class StaticLength {
    constructor() {
        Object.defineProperty(this, "length", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        }); // ok
    }
}
class StaticLength2 {
    constructor() {
        Object.defineProperty(this, _d, {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        }); // ok
    }
}
_c = FunctionPropertyNames.length, _d = FunctionPropertyNames.length;
class StaticLengthFn {
    static length() { } // error without useDefineForClassFields
    length() { } // ok
}
class StaticLengthFn2 {
    static [FunctionPropertyNames.length]() { } // error without useDefineForClassFields
    [FunctionPropertyNames.length]() { } // ok
}
// prototype
class StaticPrototype {
    constructor() {
        Object.defineProperty(this, "prototype", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        }); // ok
    }
}
class StaticPrototype2 {
    constructor() {
        Object.defineProperty(this, _f, {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        }); // ok
    }
}
_e = FunctionPropertyNames.prototype, _f = FunctionPropertyNames.prototype;
class StaticPrototypeFn {
    static prototype() { } // always an error
    prototype() { } // ok
}
class StaticPrototypeFn2 {
    static [FunctionPropertyNames.prototype]() { } // always an error
    [FunctionPropertyNames.prototype]() { } // ok
}
// caller
class StaticCaller {
    constructor() {
        Object.defineProperty(this, "caller", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        }); // ok
    }
}
class StaticCaller2 {
    constructor() {
        Object.defineProperty(this, _h, {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        }); // ok
    }
}
_g = FunctionPropertyNames.caller, _h = FunctionPropertyNames.caller;
class StaticCallerFn {
    static caller() { } // error without useDefineForClassFields
    caller() { } // ok
}
class StaticCallerFn2 {
    static [FunctionPropertyNames.caller]() { } // error without useDefineForClassFields
    [FunctionPropertyNames.caller]() { } // ok
}
// arguments
class StaticArguments {
    constructor() {
        Object.defineProperty(this, "arguments", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        }); // ok
    }
}
class StaticArguments2 {
    constructor() {
        Object.defineProperty(this, _k, {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        }); // ok
    }
}
_j = FunctionPropertyNames.arguments, _k = FunctionPropertyNames.arguments;
class StaticArgumentsFn {
    static arguments() { } // error without useDefineForClassFields
    arguments() { } // ok
}
class StaticArgumentsFn2 {
    static [FunctionPropertyNames.arguments]() { } // error without useDefineForClassFields
    [FunctionPropertyNames.arguments]() { } // ok
}
// === Static properties on anonymous classes ===
// name
var StaticName_Anonymous = class {
    constructor() {
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        }); // ok
    }
};
var StaticName_Anonymous2 = (_l = class {
        constructor() {
            Object.defineProperty(this, _o, {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            }); // ok
        }
    },
    _m = FunctionPropertyNames.name,
    _o = FunctionPropertyNames.name,
    __setFunctionName(_l, "StaticName_Anonymous2"),
    _l);
var StaticNameFn_Anonymous = class {
    static name() { } // error without useDefineForClassFields
    name() { } // ok
};
var StaticNameFn_Anonymous2 = class {
    static [FunctionPropertyNames.name]() { } // error without useDefineForClassFields
    [FunctionPropertyNames.name]() { } // ok
};
// length
var StaticLength_Anonymous = class {
    constructor() {
        Object.defineProperty(this, "length", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        }); // ok
    }
};
var StaticLength_Anonymous2 = (_p = class {
        constructor() {
            Object.defineProperty(this, _r, {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            }); // ok
        }
    },
    _q = FunctionPropertyNames.length,
    _r = FunctionPropertyNames.length,
    __setFunctionName(_p, "StaticLength_Anonymous2"),
    _p);
var StaticLengthFn_Anonymous = class {
    static length() { } // error without useDefineForClassFields
    length() { } // ok
};
var StaticLengthFn_Anonymous2 = class {
    static [FunctionPropertyNames.length]() { } // error without useDefineForClassFields
    [FunctionPropertyNames.length]() { } // ok
};
// prototype
var StaticPrototype_Anonymous = class {
    constructor() {
        Object.defineProperty(this, "prototype", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        }); // ok
    }
};
var StaticPrototype_Anonymous2 = (_s = class {
        constructor() {
            Object.defineProperty(this, _u, {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            }); // ok
        }
    },
    _t = FunctionPropertyNames.prototype,
    _u = FunctionPropertyNames.prototype,
    __setFunctionName(_s, "StaticPrototype_Anonymous2"),
    _s);
var StaticPrototypeFn_Anonymous = class {
    static prototype() { } // always an error
    prototype() { } // ok
};
var StaticPrototypeFn_Anonymous2 = class {
    static [FunctionPropertyNames.prototype]() { } // always an error
    [FunctionPropertyNames.prototype]() { } // ok
};
// caller
var StaticCaller_Anonymous = class {
    constructor() {
        Object.defineProperty(this, "caller", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        }); // ok
    }
};
var StaticCaller_Anonymous2 = (_v = class {
        constructor() {
            Object.defineProperty(this, _x, {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            }); // ok
        }
    },
    _w = FunctionPropertyNames.caller,
    _x = FunctionPropertyNames.caller,
    __setFunctionName(_v, "StaticCaller_Anonymous2"),
    _v);
var StaticCallerFn_Anonymous = class {
    static caller() { } // error without useDefineForClassFields
    caller() { } // ok
};
var StaticCallerFn_Anonymous2 = class {
    static [FunctionPropertyNames.caller]() { } // error without useDefineForClassFields
    [FunctionPropertyNames.caller]() { } // ok
};
// arguments
var StaticArguments_Anonymous = class {
    constructor() {
        Object.defineProperty(this, "arguments", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        }); // ok
    }
};
var StaticArguments_Anonymous2 = (_y = class {
        constructor() {
            Object.defineProperty(this, _0, {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            }); // ok
        }
    },
    _z = FunctionPropertyNames.arguments,
    _0 = FunctionPropertyNames.arguments,
    __setFunctionName(_y, "StaticArguments_Anonymous2"),
    _y);
var StaticArgumentsFn_Anonymous = class {
    static arguments() { } // error without useDefineForClassFields
    arguments() { } // ok
};
var StaticArgumentsFn_Anonymous2 = class {
    static [FunctionPropertyNames.arguments]() { } // error without useDefineForClassFields
    [FunctionPropertyNames.arguments]() { } // ok
};
// === Static properties on default exported classes ===
// name
var TestOnDefaultExportedClass_1;
(function (TestOnDefaultExportedClass_1) {
    class StaticName {
        constructor() {
            Object.defineProperty(this, "name", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            }); // ok
        }
    }
})(TestOnDefaultExportedClass_1 || (TestOnDefaultExportedClass_1 = {}));
export class ExportedStaticName {
    constructor() {
        Object.defineProperty(this, _2, {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        }); // ok
    }
}
_1 = FunctionPropertyNames.name, _2 = FunctionPropertyNames.name;
var TestOnDefaultExportedClass_2;
(function (TestOnDefaultExportedClass_2) {
    class StaticNameFn {
        static name() { } // error without useDefineForClassFields
        name() { } // ok
    }
})(TestOnDefaultExportedClass_2 || (TestOnDefaultExportedClass_2 = {}));
export class ExportedStaticNameFn {
    static [FunctionPropertyNames.name]() { } // error without useDefineForClassFields
    [FunctionPropertyNames.name]() { } // ok
}
// length
var TestOnDefaultExportedClass_3;
(function (TestOnDefaultExportedClass_3) {
    class StaticLength {
        constructor() {
            Object.defineProperty(this, "length", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            }); // ok
        }
    }
    TestOnDefaultExportedClass_3.StaticLength = StaticLength;
})(TestOnDefaultExportedClass_3 || (TestOnDefaultExportedClass_3 = {}));
export class ExportedStaticLength {
    constructor() {
        Object.defineProperty(this, _4, {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        }); // ok
    }
}
_3 = FunctionPropertyNames.length, _4 = FunctionPropertyNames.length;
var TestOnDefaultExportedClass_4;
(function (TestOnDefaultExportedClass_4) {
    class StaticLengthFn {
        static length() { } // error without useDefineForClassFields
        length() { } // ok
    }
    TestOnDefaultExportedClass_4.StaticLengthFn = StaticLengthFn;
})(TestOnDefaultExportedClass_4 || (TestOnDefaultExportedClass_4 = {}));
export class ExportedStaticLengthFn {
    static [FunctionPropertyNames.length]() { } // error without useDefineForClassFields
    [FunctionPropertyNames.length]() { } // ok
}
// prototype
var TestOnDefaultExportedClass_5;
(function (TestOnDefaultExportedClass_5) {
    class StaticPrototype {
        constructor() {
            Object.defineProperty(this, "prototype", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            }); // ok
        }
    }
    TestOnDefaultExportedClass_5.StaticPrototype = StaticPrototype;
})(TestOnDefaultExportedClass_5 || (TestOnDefaultExportedClass_5 = {}));
export class ExportedStaticPrototype {
    constructor() {
        Object.defineProperty(this, _6, {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        }); // ok
    }
}
_5 = FunctionPropertyNames.prototype, _6 = FunctionPropertyNames.prototype;
var TestOnDefaultExportedClass_6;
(function (TestOnDefaultExportedClass_6) {
    class StaticPrototypeFn {
        static prototype() { } // always an error
        prototype() { } // ok
    }
    TestOnDefaultExportedClass_6.StaticPrototypeFn = StaticPrototypeFn;
})(TestOnDefaultExportedClass_6 || (TestOnDefaultExportedClass_6 = {}));
export class ExportedStaticPrototypeFn {
    static [FunctionPropertyNames.prototype]() { } // always an error
    [FunctionPropertyNames.prototype]() { } // ok
}
// caller
var TestOnDefaultExportedClass_7;
(function (TestOnDefaultExportedClass_7) {
    class StaticCaller {
        constructor() {
            Object.defineProperty(this, "caller", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            }); // ok
        }
    }
    TestOnDefaultExportedClass_7.StaticCaller = StaticCaller;
})(TestOnDefaultExportedClass_7 || (TestOnDefaultExportedClass_7 = {}));
export class ExportedStaticCaller {
    constructor() {
        Object.defineProperty(this, _8, {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        }); // ok
    }
}
_7 = FunctionPropertyNames.caller, _8 = FunctionPropertyNames.caller;
var TestOnDefaultExportedClass_8;
(function (TestOnDefaultExportedClass_8) {
    class StaticCallerFn {
        static caller() { } // error without useDefineForClassFields
        caller() { } // ok
    }
    TestOnDefaultExportedClass_8.StaticCallerFn = StaticCallerFn;
})(TestOnDefaultExportedClass_8 || (TestOnDefaultExportedClass_8 = {}));
export class ExportedStaticCallerFn {
    static [FunctionPropertyNames.caller]() { } // error without useDefineForClassFields
    [FunctionPropertyNames.caller]() { } // ok
}
// arguments
var TestOnDefaultExportedClass_9;
(function (TestOnDefaultExportedClass_9) {
    class StaticArguments {
        constructor() {
            Object.defineProperty(this, "arguments", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            }); // ok
        }
    }
    TestOnDefaultExportedClass_9.StaticArguments = StaticArguments;
})(TestOnDefaultExportedClass_9 || (TestOnDefaultExportedClass_9 = {}));
export class ExportedStaticArguments {
    constructor() {
        Object.defineProperty(this, _10, {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        }); // ok
    }
}
_9 = FunctionPropertyNames.arguments, _10 = FunctionPropertyNames.arguments;
var TestOnDefaultExportedClass_10;
(function (TestOnDefaultExportedClass_10) {
    class StaticArgumentsFn {
        static arguments() { } // error without useDefineForClassFields
        arguments() { } // ok
    }
    TestOnDefaultExportedClass_10.StaticArgumentsFn = StaticArgumentsFn;
})(TestOnDefaultExportedClass_10 || (TestOnDefaultExportedClass_10 = {}));
export class ExportedStaticArgumentsFn {
    static [FunctionPropertyNames.arguments]() { } // error without useDefineForClassFields
    [FunctionPropertyNames.arguments]() { } // ok
}
