//// [tests/cases/conformance/expressions/functions/arrowFunctionContexts.ts] ////

//// [arrowFunctionContexts.ts]
// Arrow function used in with statement
with (window) {
    var p = () => this;
}

// Arrow function as argument to super call
class Base {
    constructor(n: any) { }
}

class Derived extends Base {
    constructor() {
        super(() => this);
    }
}

// Arrow function as function argument
window.setTimeout(() => null, 100);

// Arrow function as value in array literal

var obj = (n: number) => '';
var obj: { (n: number): string; }; // OK

var arr = [(n: number) => ''];
var arr: { (n: number): string; }[]; // Incorrect error here (bug 829597)

// Arrow function as enum value
enum E {
    x = () => 4, // Error expected
    y = (() => this).length // error, can't use this in enum
}

// Arrow function as module variable initializer
module M {
    export var a = (s) => '';
    var b = (s) => s;
}

// Repeat above for module members that are functions? (necessary to redo all of them?)
module M2 {
    // Arrow function used in with statement
    with (window) {
        var p = () => this;
    }

    // Arrow function as argument to super call
    class Base {
        constructor(n: any) { }
    }

    class Derived extends Base {
        constructor() {
            super(() => this);
        }
    }

    // Arrow function as function argument
    window.setTimeout(() => null, 100);

    // Arrow function as value in array literal

    var obj = (n: number) => '';
    var obj: { (n: number): string; }; // OK

    var arr = [(n: number) => ''];
    var arr: { (n: number): string; }[]; // Incorrect error here (bug 829597)

    // Arrow function as enum value
    enum E {
        x = () => 4, // Error expected
        y = (() => this).length
    }

    // Arrow function as module variable initializer
    module M {
        export var a = (s) => '';
        var b = (s) => s;
    }

}

// <Identifier>(ParamList) => { ... } is a generic arrow function
var generic1 = <T>(n: T) => [n];
var generic1: { <T>(n: T): T[] }; // Incorrect error, Bug 829597
var generic2 = <T>(n: T) => { return [n]; };
var generic2: { <T>(n: T): T[] };

// <Identifier> ((ParamList) => { ... } ) is a type assertion to an arrow function
var asserted1 = <any>((n) => [n]);
var asserted1: any;
var asserted2 = <any>((n) => { return n; });
var asserted2: any;



//// [arrowFunctionContexts.js]
with (window) {
    var p = () => this;
}
class Base {
    constructor(n) { }
}
class Derived extends Base {
    constructor() {
        super(() => this);
    }
}
window.setTimeout(() => null, 100);
var obj = (n) => '';
var obj;
var arr = [(n) => ''];
var arr;
var E;
(function (E) {
    E["x"] = () => 4;
    if (typeof E.x !== "string") E[E.x] = "x";
    E["y"] = (() => this).length;
    if (typeof E.y !== "string") E[E.y] = "y";
})(E || (E = {}));
var M;
(function (M) {
    M.a = (s) => '';
    var b = (s) => s;
})(M || (M = {}));
var M2;
(function (M2) {
    with (window) {
        var p = () => this;
    }
    class Base {
        constructor(n) { }
    }
    class Derived extends Base {
        constructor() {
            super(() => this);
        }
    }
    window.setTimeout(() => null, 100);
    var obj = (n) => '';
    var obj;
    var arr = [(n) => ''];
    var arr;
    let E;
    (function (E) {
        E["x"] = () => 4;
        if (typeof E.x !== "string") E[E.x] = "x";
        E["y"] = (() => this).length;
        if (typeof E.y !== "string") E[E.y] = "y";
    })(E || (E = {}));
    let M;
    (function (M) {
        M.a = (s) => '';
        var b = (s) => s;
    })(M || (M = {}));
})(M2 || (M2 = {}));
var generic1 = (n) => [n];
var generic1;
var generic2 = (n) => { return [n]; };
var generic2;
var asserted1 = ((n) => [n]);
var asserted1;
var asserted2 = ((n) => { return n; });
var asserted2;
