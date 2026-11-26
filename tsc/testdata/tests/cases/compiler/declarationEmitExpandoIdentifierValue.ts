// @declaration: true
// @strict: true
// @target: esnext
// @module: nodenext
// @outDir: out

// @filename: dep.ts
export const imported = 1;
export let importedLet = "s";

// @filename: lib.ts
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

// @filename: use.ts
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
