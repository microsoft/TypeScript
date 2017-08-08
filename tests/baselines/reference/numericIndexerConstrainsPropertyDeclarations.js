//// [numericIndexerConstrainsPropertyDeclarations.ts]
// String indexer types constrain the types of named properties in their containing type

interface MyNumber extends Number {
    foo: number;
}

class C {
    [x: number]: string;

    constructor() { } // ok

    a: string; // ok
    b: number; // ok
    c: () => {} // ok
    "d": string; // ok
    "e": number; // ok
    1.0: string; // ok
    2.0: number; // error
    "3.0": string; // ok
    "4.0": number; // error
    3.0: MyNumber // error

    get X() { // ok
        return '';
    }
    set X(v) { } // ok

    foo() { 
        return '';
    }

    static sa: number; // ok
    static sb: string; // ok

    static foo() { } // ok
    static get X() { // ok
        return 1;
    }
}

interface I {
    [x: number]: string;

    a: string; // ok
    b: number; // ok
    c: () => {} // ok
    "d": string; // ok
    "e": number; // ok
    1.0: string; // ok
    2.0: number; // error
    (): string; // ok
    (x): number // ok
    foo(): string; // ok
    "3.0": string; // ok
    "4.0": number; // error
    f: MyNumber; // error
}

var a: {
    [x: number]: string;

    a: string; // ok
    b: number; // ok
    c: () => {} // ok
    "d": string; // ok
    "e": number; // ok
    1.0: string; // ok
    2.0: number; // error
    (): string; // ok
    (x): number // ok
    foo(): string; // ok
    "3.0": string; // ok
    "4.0": number; // error
    f: MyNumber; // error
}

// error
var b: { [x: number]: string; } = {
    a: '',
    b: 1, 
    c: () => { }, 
    "d": '', 
    "e": 1, 
    1.0: '',
    2.0: 1, 
    "3.0": '', 
    "4.0": 1, 
    f: <Myn>null, 

    get X() { 
        return '';
    },
    set X(v) { }, 
    foo() { 
        return '';
    }
}

//// [numericIndexerConstrainsPropertyDeclarations.js]
// String indexer types constrain the types of named properties in their containing type
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true, writable: false, enumerable: false
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
var C = (function () {
    function C() {
    } // ok
    Object.defineProperty(C.prototype, "X", {
        get: function () {
            return '';
        },
        set: function (v) { } // ok
        ,
        enumerable: true,
        configurable: true
    });
    C.prototype.foo = function () {
        return '';
    };
    C.foo = function () { }; // ok
    Object.defineProperty(C, "X", {
        get: function () {
            return 1;
        },
        enumerable: true,
        configurable: true
    });
    __names(C.prototype, ["foo"]);
    return C;
}());
var a;
// error
var b = {
    a: '',
    b: 1,
    c: function () { },
    "d": '',
    "e": 1,
    1.0: '',
    2.0: 1,
    "3.0": '',
    "4.0": 1,
    f: null,
    get X() {
        return '';
    },
    set X(v) { },
    foo: function () {
        return '';
    }
};
