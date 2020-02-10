//// [strictPropertyInitialization.ts]
// Properties with non-undefined types require initialization

class C1 {
    a: number;  // Error
    b: number | undefined;
    c: number | null;  // Error
    d?: number;
    #f: number; //Error
    #g: number | undefined;
    #h: number | null; //Error
    #i?: number;
}

// No strict initialization checks in ambient contexts

declare class C2 {
    a: number;
    b: number | undefined;
    c: number | null;
    d?: number;
    
    #f: number;
    #g: number | undefined;
    #h: number | null;
    #i?: number;
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
    #d = 0
    #e: number = 0
    #f: string= "abc"
}

// Assignment in constructor satisfies strict initialization check

class C5 {
    a: number;
    #b: number;
    constructor() {
        this.a = 0;
        this.#b = 0;
    }
}

// All code paths must contain assignment

class C6 {
    a: number;  // Error
    #b: number
    constructor(cond: boolean) {
        if (cond) {
            return;
        }
        this.a = 0;
        this.#b = 0;
    }
}

class C7 {
    a: number;
    #b: number;
    constructor(cond: boolean) {
        if (cond) {
            this.a = 1;
            this.#b = 1;
            return;
        }
        this.a = 0;
        this.#b = 1;
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
    #d: number;
    constructor() {
        let x = this.a;  // Error
        this.a = this.b;  // Error
        this.b = this.#d //Error
        this.b = x;
        this.#d = x;
        let y = this.c;
    }
}

// Property is considered initialized by type any even though value could be undefined

declare function someValue(): any;

class C11 {
    a: number;
    #b: number;
    constructor() {
        this.a = someValue();
        this.#b = someValue();
    }
}


//// [strictPropertyInitialization.js]
"use strict";
// Properties with non-undefined types require initialization
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _f, _g, _h, _i, _d, _e, _f_1, _b, _b_1, _b_2, _d_1, _b_3;
class C1 {
    constructor() {
        _f.set(this, void 0); //Error
        _g.set(this, void 0);
        _h.set(this, void 0); //Error
        _i.set(this, void 0);
    }
}
_f = new WeakMap(), _g = new WeakMap(), _h = new WeakMap(), _i = new WeakMap();
// No strict initialization checks for static members
class C3 {
}
// Initializer satisfies strict initialization check
class C4 {
    constructor() {
        this.a = 0;
        this.b = 0;
        this.c = "abc";
        _d.set(this, 0);
        _e.set(this, 0);
        _f_1.set(this, "abc");
    }
}
_d = new WeakMap(), _e = new WeakMap(), _f_1 = new WeakMap();
// Assignment in constructor satisfies strict initialization check
class C5 {
    constructor() {
        _b.set(this, void 0);
        this.a = 0;
        __classPrivateFieldSet(this, _b, 0);
    }
}
_b = new WeakMap();
// All code paths must contain assignment
class C6 {
    constructor(cond) {
        _b_1.set(this, void 0);
        if (cond) {
            return;
        }
        this.a = 0;
        __classPrivateFieldSet(this, _b_1, 0);
    }
}
_b_1 = new WeakMap();
class C7 {
    constructor(cond) {
        _b_2.set(this, void 0);
        if (cond) {
            this.a = 1;
            __classPrivateFieldSet(this, _b_2, 1);
            return;
        }
        this.a = 0;
        __classPrivateFieldSet(this, _b_2, 1);
    }
}
_b_2 = new WeakMap();
// Properties with string literal names aren't checked
class C8 {
}
// No strict initialization checks for abstract members
class C9 {
}
// Properties with non-undefined types must be assigned before they can be accessed
// within their constructor
class C10 {
    constructor() {
        _d_1.set(this, void 0);
        let x = this.a; // Error
        this.a = this.b; // Error
        this.b = __classPrivateFieldGet(this, _d_1); //Error
        this.b = x;
        __classPrivateFieldSet(this, _d_1, x);
        let y = this.c;
    }
}
_d_1 = new WeakMap();
class C11 {
    constructor() {
        _b_3.set(this, void 0);
        this.a = someValue();
        __classPrivateFieldSet(this, _b_3, someValue());
    }
}
_b_3 = new WeakMap();


//// [strictPropertyInitialization.d.ts]
declare class C1 {
    #private;
    a: number;
    b: number | undefined;
    c: number | null;
    d?: number;
}
declare class C2 {
    #private;
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
    #private;
    a: number;
    b: number;
    c: string;
}
declare class C5 {
    #private;
    a: number;
    constructor();
}
declare class C6 {
    #private;
    a: number;
    constructor(cond: boolean);
}
declare class C7 {
    #private;
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
    #private;
    a: number;
    b: number;
    c?: number;
    constructor();
}
declare function someValue(): any;
declare class C11 {
    #private;
    a: number;
    constructor();
}
