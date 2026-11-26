//// [tests/cases/compiler/declarationEmitExpandoIdentifierValue.ts] ////

//// [dep.ts]
export const imported = 1;
export let importedLet = "s";

//// [lib.ts]
import { imported, importedLet } from "./dep";

// Not an alias: the identifier means something else, or has another type, where the namespace is declared

export function loop() {}
for (const k of ["a", "b"]) {
    loop.last = k;
}

const shadowed = 1;
export function shadow() {}
{
    const shadowed = "s";
    shadow.v = shadowed;
}

declare const wide: string | number;
export function narrowed() {}
if (typeof wide === "string") {
    narrowed.s = wide;
}

const VERSION = "1.2.3";
export function literal() {}
literal.version = VERSION;

const initial: number = 1;
export function reassigned() {}
reassigned.n = initial;
reassigned.n = 5;

export function fromImport() {}
fromImport.literal = imported;

// Still an alias

export function keepsImport() {}
keepsImport.value = importedLet;

let mutable = 1;
export function keepsLet() {}
keepsLet.m = mutable;

class C {
    x = 1;
}
export function keepsClass() {}
keepsClass.C = C;

function helper() {
    return 1;
}
export function keepsFunction() {}
keepsFunction.helper = helper;

export const arrowHost = () => {};
const arrowValue: string = "x";
arrowHost.v = arrowValue;

export namespace N {
    const k: number = 1;
    export function f() {}
    f.k = k;
    {
        const k = "s";
        f.inner = k;
    }
}

//// [use.ts]
import { loop, shadow, narrowed, literal, reassigned, fromImport, keepsImport, keepsLet, keepsClass, keepsFunction, arrowHost, N } from "./lib";
const s1: string = loop.last;
const s2: string = shadow.v;
const s3: string = narrowed.s;
literal.version = "2.0.0";
reassigned.n = 6;
fromImport.literal = 2;
const s4: string = keepsImport.value;
const n1: number = keepsLet.m;
const n0: number = new keepsClass.C().x;
const n2: number = keepsFunction.helper();
const s5: string = arrowHost.v;
const n3: number = N.f.k;
const s6: string = N.f.inner;


//// [dep.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.importedLet = exports.imported = void 0;
exports.imported = 1;
exports.importedLet = "s";
//// [lib.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.N = exports.arrowHost = void 0;
exports.loop = loop;
exports.shadow = shadow;
exports.narrowed = narrowed;
exports.literal = literal;
exports.reassigned = reassigned;
exports.fromImport = fromImport;
exports.keepsImport = keepsImport;
exports.keepsLet = keepsLet;
exports.keepsClass = keepsClass;
exports.keepsFunction = keepsFunction;
const dep_1 = require("./dep");
// Not an alias: the identifier means something else, or has another type, where the namespace is declared
function loop() { }
for (const k of ["a", "b"]) {
    loop.last = k;
}
const shadowed = 1;
function shadow() { }
{
    const shadowed = "s";
    shadow.v = shadowed;
}
function narrowed() { }
if (typeof wide === "string") {
    narrowed.s = wide;
}
const VERSION = "1.2.3";
function literal() { }
literal.version = VERSION;
const initial = 1;
function reassigned() { }
reassigned.n = initial;
reassigned.n = 5;
function fromImport() { }
fromImport.literal = dep_1.imported;
// Still an alias
function keepsImport() { }
keepsImport.value = dep_1.importedLet;
let mutable = 1;
function keepsLet() { }
keepsLet.m = mutable;
class C {
    x = 1;
}
function keepsClass() { }
keepsClass.C = C;
function helper() {
    return 1;
}
function keepsFunction() { }
keepsFunction.helper = helper;
const arrowHost = () => { };
exports.arrowHost = arrowHost;
const arrowValue = "x";
exports.arrowHost.v = arrowValue;
var N;
(function (N) {
    const k = 1;
    function f() { }
    N.f = f;
    f.k = k;
    {
        const k = "s";
        f.inner = k;
    }
})(N || (exports.N = N = {}));
//// [use.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("./lib");
const s1 = lib_1.loop.last;
const s2 = lib_1.shadow.v;
const s3 = lib_1.narrowed.s;
lib_1.literal.version = "2.0.0";
lib_1.reassigned.n = 6;
lib_1.fromImport.literal = 2;
const s4 = lib_1.keepsImport.value;
const n1 = lib_1.keepsLet.m;
const n0 = new lib_1.keepsClass.C().x;
const n2 = lib_1.keepsFunction.helper();
const s5 = lib_1.arrowHost.v;
const n3 = lib_1.N.f.k;
const s6 = lib_1.N.f.inner;


//// [dep.d.ts]
export declare const imported = 1;
export declare let importedLet: string;
//// [lib.d.ts]
import { imported, importedLet } from "./dep";
export declare function loop(): void;
export declare namespace loop {
    export { k as last };
}
declare const shadowed = 1;
export declare function shadow(): void;
export declare namespace shadow {
    export { shadowed as v };
}
declare const wide: string | number;
export declare function narrowed(): void;
export declare namespace narrowed {
    export { wide as s };
}
declare const VERSION = "1.2.3";
export declare function literal(): void;
export declare namespace literal {
    export { VERSION as version };
}
declare const initial: number;
export declare function reassigned(): void;
export declare namespace reassigned {
    export { initial as n };
    export var n: number;
}
export declare function fromImport(): void;
export declare namespace fromImport {
    export { imported as literal };
}
export declare function keepsImport(): void;
export declare namespace keepsImport {
    export { importedLet as value };
}
declare let mutable: number;
export declare function keepsLet(): void;
export declare namespace keepsLet {
    export { mutable as m };
}
declare class C {
    x: number;
}
export declare function keepsClass(): void;
export declare namespace keepsClass {
    export { C };
}
declare function helper(): number;
export declare function keepsFunction(): void;
export declare namespace keepsFunction {
    export { helper };
}
export declare function arrowHost(): void;
export declare namespace arrowHost {
    export { arrowValue as v };
}
declare const arrowValue: string;
export declare namespace N {
    function f(): void;
    namespace f {
        export { k };
        export { k as inner };
    }
}
export {};
//// [use.d.ts]
export {};


//// [DtsFileErrors]


out/lib.d.ts(4,14): error TS2304: Cannot find name 'k'.
out/lib.d.ts(24,14): error TS2484: Export declaration conflicts with exported declaration of 'n'.
out/lib.d.ts(60,18): error TS2304: Cannot find name 'k'.
out/lib.d.ts(61,18): error TS2304: Cannot find name 'k'.


==== out/dep.d.ts (0 errors) ====
    export declare const imported = 1;
    export declare let importedLet: string;
    
==== out/lib.d.ts (4 errors) ====
    import { imported, importedLet } from "./dep";
    export declare function loop(): void;
    export declare namespace loop {
        export { k as last };
                 ~
!!! error TS2304: Cannot find name 'k'.
    }
    declare const shadowed = 1;
    export declare function shadow(): void;
    export declare namespace shadow {
        export { shadowed as v };
    }
    declare const wide: string | number;
    export declare function narrowed(): void;
    export declare namespace narrowed {
        export { wide as s };
    }
    declare const VERSION = "1.2.3";
    export declare function literal(): void;
    export declare namespace literal {
        export { VERSION as version };
    }
    declare const initial: number;
    export declare function reassigned(): void;
    export declare namespace reassigned {
        export { initial as n };
                 ~~~~~~~~~~~~
!!! error TS2484: Export declaration conflicts with exported declaration of 'n'.
        export var n: number;
    }
    export declare function fromImport(): void;
    export declare namespace fromImport {
        export { imported as literal };
    }
    export declare function keepsImport(): void;
    export declare namespace keepsImport {
        export { importedLet as value };
    }
    declare let mutable: number;
    export declare function keepsLet(): void;
    export declare namespace keepsLet {
        export { mutable as m };
    }
    declare class C {
        x: number;
    }
    export declare function keepsClass(): void;
    export declare namespace keepsClass {
        export { C };
    }
    declare function helper(): number;
    export declare function keepsFunction(): void;
    export declare namespace keepsFunction {
        export { helper };
    }
    export declare function arrowHost(): void;
    export declare namespace arrowHost {
        export { arrowValue as v };
    }
    declare const arrowValue: string;
    export declare namespace N {
        function f(): void;
        namespace f {
            export { k };
                     ~
!!! error TS2304: Cannot find name 'k'.
            export { k as inner };
                     ~
!!! error TS2304: Cannot find name 'k'.
        }
    }
    export {};
    
==== out/use.d.ts (0 errors) ====
    export {};
    