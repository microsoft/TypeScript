//// [tests/cases/compiler/omitTypeTests01.ts] ////

//// [omitTypeTests01.ts]
interface Foo {
    a: string;
    b: number;
    c: boolean;
}

export type Bar = Omit<Foo, "c">;
export type Baz = Omit<Foo, "b" | "c">;

export function getBarA(bar: Bar) {
    return bar.a;
}

export function getBazA(baz: Baz) {
    return baz.a;
}



//// [omitTypeTests01.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBarA = getBarA;
exports.getBazA = getBazA;
function getBarA(bar) {
    return bar.a;
}
function getBazA(baz) {
    return baz.a;
}


//// [omitTypeTests01.d.ts]
interface Foo {
    a: string;
    b: number;
    c: boolean;
}
export type Bar = Omit<Foo, "c">;
export type Baz = Omit<Foo, "b" | "c">;
export declare function getBarA(bar: Bar): string;
export declare function getBazA(baz: Baz): string;
export {};
