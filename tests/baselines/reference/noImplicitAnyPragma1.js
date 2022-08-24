//// [tests/cases/conformance/pragma/noImplicitAny/noImplicitAnyPragma1.ts] ////

//// [file1.ts]
// @ts-noImplicitAny
import * as ns from "missing";

const a = p => p + 1;

let x;
x = "a";
x = 42;

export class A {
    prop;
    prop2;
    constructor() {
        this.prop = "a";
        this.prop = 42;
    }
    static stat;
    static stat2;
    static {
        this.stat = "a";
        this.stat = 42;
    }

    set access(param) {}
    get access() { return this.access; }
}

export function f1() {
    return f1();
}

const res = {}["none"];

interface B { prop: string }
declare var b: B;

const c = b["none"];

const d: B = { prop: "", excess: "yes" };

function f2(): string { return ""; }
const e = new f2();
//// [file2.ts]
// @ts-noImplicitAny true
import * as ns from "missing";

const a = p => p + 1;

let x;
x = "a";
x = 42;

export class A {
    prop;
    prop2;
    constructor() {
        this.prop = "a";
        this.prop = 42;
    }
    static stat;
    static stat2;
    static {
        this.stat = "a";
        this.stat = 42;
    }

    set access(param) {}
    get access() { return this.access; }
}

export function f1() {
    return f1();
}

const res = {}["none"];

interface B { prop: string }
declare var b: B;

const c = b["none"];

const d: B = { prop: "", excess: "yes" };

function f2(): string { return ""; }
const e = new f2();
//// [file3.ts]
// @ts-noImplicitAny false
import * as ns from "missing";

const a = p => p + 1;

let x;
x = "a";
x = 42;

export class A {
    prop;
    prop2;
    constructor() {
        this.prop = "a";
        this.prop = 42;
    }
    static stat;
    static stat2;
    static {
        this.stat = "a";
        this.stat = 42;
    }

    set access(param) {}
    get access() { return this.access; }
}

export function f1() {
    return f1();
}

const res = {}["none"];

interface B { prop: string }
declare var b: B;

const c = b["none"];

const d: B = { prop: "", excess: "yes" };

function f2(): string { return ""; }
const e = new f2();
//// [file4.ts]
import * as ns from "missing";

const a = p => p + 1;

let x;
x = "a";
x = 42;

export class A {
    prop;
    prop2;
    constructor() {
        this.prop = "a";
        this.prop = 42;
    }
    static stat;
    static stat2;
    static {
        this.stat = "a";
        this.stat = 42;
    }

    set access(param) {}
    get access() { return this.access; }
}

export function f1() {
    return f1();
}

const res = {}["none"];

interface B { prop: string }
declare var b: B;

const c = b["none"];

const d: B = { prop: "", excess: "yes" };

function f2(): string { return ""; }
const e = new f2();

//// [file1.js]
var _a;
const a = p => p + 1;
let x;
x = "a";
x = 42;
export class A {
    constructor() {
        this.prop = "a";
        this.prop = 42;
    }
    set access(param) { }
    get access() { return this.access; }
}
_a = A;
(() => {
    _a.stat = "a";
    _a.stat = 42;
})();
export function f1() {
    return f1();
}
const res = {}["none"];
const c = b["none"];
const d = { prop: "", excess: "yes" };
function f2() { return ""; }
const e = new f2();
//// [file2.js]
var _a;
const a = p => p + 1;
let x;
x = "a";
x = 42;
export class A {
    constructor() {
        this.prop = "a";
        this.prop = 42;
    }
    set access(param) { }
    get access() { return this.access; }
}
_a = A;
(() => {
    _a.stat = "a";
    _a.stat = 42;
})();
export function f1() {
    return f1();
}
const res = {}["none"];
const c = b["none"];
const d = { prop: "", excess: "yes" };
function f2() { return ""; }
const e = new f2();
//// [file3.js]
var _a;
const a = p => p + 1;
let x;
x = "a";
x = 42;
export class A {
    constructor() {
        this.prop = "a";
        this.prop = 42;
    }
    set access(param) { }
    get access() { return this.access; }
}
_a = A;
(() => {
    _a.stat = "a";
    _a.stat = 42;
})();
export function f1() {
    return f1();
}
const res = {}["none"];
const c = b["none"];
const d = { prop: "", excess: "yes" };
function f2() { return ""; }
const e = new f2();
//// [file4.js]
var _a;
const a = p => p + 1;
let x;
x = "a";
x = 42;
export class A {
    constructor() {
        this.prop = "a";
        this.prop = 42;
    }
    set access(param) { }
    get access() { return this.access; }
}
_a = A;
(() => {
    _a.stat = "a";
    _a.stat = 42;
})();
export function f1() {
    return f1();
}
const res = {}["none"];
const c = b["none"];
const d = { prop: "", excess: "yes" };
function f2() { return ""; }
const e = new f2();
