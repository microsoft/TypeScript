//// [strictPropertyInitialization.ts]
// Properties with non-undefined types require initialization

class C1 {
    a: number;  // Error
    b: number | undefined;
    c: number | null;  // Error
    d?: number;
}

// No strict initialization checks in ambient contexts

declare class C2 {
    a: number;
    b: number | undefined;
    c: number | null;
    d?: number;
}

// No strict initialization checks for static members

class C3 {
    static a: number;
    static b: number | undefined;
    static c: number | null;
    static d?: number;
}

// Initializer satisfies strict initialization check

class C4 {
    a = 0;
    b: number = 0;
    c: string = "abc";
}

// Assignment in constructor satisfies strict initialization check

class C5 {
    a: number;
    constructor() {
        this.a = 0;
    }
}

// All code paths must contain assignment

class C6 {
    a: number;  // Error
    constructor(cond: boolean) {
        if (cond) {
            return;
        }
        this.a = 0;
    }
}

class C7 {
    a: number;
    constructor(cond: boolean) {
        if (cond) {
            this.a = 1;
            return;
        }
        this.a = 0;
    }
}

// Properties with string literal names aren't checked

class C8 {
    a: number;  // Error
    "b": number;
    0: number;
}

// No strict initialization checks for abstract members

abstract class C9 {
    abstract a: number;
    abstract b: number | undefined;
    abstract c: number | null;
    abstract d?: number;
}

// Properties with non-undefined types must be assigned before they can be accessed
// within their constructor

class C10 {
    a: number;
    b: number;
    c?: number;
    constructor() {
        let x = this.a;  // Error
        this.a = this.b;  // Error
        this.b = x;
        let y = this.c;
    }
}

// Property is considered initialized by type any even though value could be undefined

declare function someValue(): any;

class C11 {
    a: number;
    constructor() {
        this.a = someValue();
    }
}


//// [strictPropertyInitialization.js]
"use strict";
// Properties with non-undefined types require initialization
var C1 = /** @class */ (function () {
    function C1() {
    }
    return C1;
}());
// No strict initialization checks for static members
var C3 = /** @class */ (function () {
    function C3() {
    }
    return C3;
}());
// Initializer satisfies strict initialization check
var C4 = /** @class */ (function () {
    function C4() {
        this.a = 0;
        this.b = 0;
        this.c = "abc";
    }
    return C4;
}());
// Assignment in constructor satisfies strict initialization check
var C5 = /** @class */ (function () {
    function C5() {
        this.a = 0;
    }
    return C5;
}());
// All code paths must contain assignment
var C6 = /** @class */ (function () {
    function C6(cond) {
        if (cond) {
            return;
        }
        this.a = 0;
    }
    return C6;
}());
var C7 = /** @class */ (function () {
    function C7(cond) {
        if (cond) {
            this.a = 1;
            return;
        }
        this.a = 0;
    }
    return C7;
}());
// Properties with string literal names aren't checked
var C8 = /** @class */ (function () {
    function C8() {
    }
    return C8;
}());
// No strict initialization checks for abstract members
var C9 = /** @class */ (function () {
    function C9() {
    }
    return C9;
}());
// Properties with non-undefined types must be assigned before they can be accessed
// within their constructor
var C10 = /** @class */ (function () {
    function C10() {
        var x = this.a; // Error
        this.a = this.b; // Error
        this.b = x;
        var y = this.c;
    }
    return C10;
}());
var C11 = /** @class */ (function () {
    function C11() {
        this.a = someValue();
    }
    return C11;
}());


//// [strictPropertyInitialization.d.ts]
declare class C1 {
    a: number;
    b: number | undefined;
    c: number | null;
    d?: number;
}
declare class C2 {
    a: number;
    b: number | undefined;
    c: number | null;
    d?: number;
}
declare class C3 {
    static a: number;
    static b: number | undefined;
    static c: number | null;
    static d?: number;
}
declare class C4 {
    a: number;
    b: number;
    c: string;
}
declare class C5 {
    a: number;
    constructor();
}
declare class C6 {
    a: number;
    constructor(cond: boolean);
}
declare class C7 {
    a: number;
    constructor(cond: boolean);
}
declare class C8 {
    a: number;
    "b": number;
    0: number;
}
declare abstract class C9 {
    abstract a: number;
    abstract b: number | undefined;
    abstract c: number | null;
    abstract d?: number;
}
declare class C10 {
    a: number;
    b: number;
    c?: number;
    constructor();
}
declare function someValue(): any;
declare class C11 {
    a: number;
    constructor();
}
