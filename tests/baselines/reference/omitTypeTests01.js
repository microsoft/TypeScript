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
exports.__esModule = true;
exports.getBazA = exports.getBarA = void 0;
function getBarA(bar) {
    return bar.a;
}
exports.getBarA = getBarA;
function getBazA(baz) {
    return baz.a;
}
exports.getBazA = getBazA;


//// [omitTypeTests01.d.ts]
interface Foo {
    a: string;
    b: number;
    c: boolean;
}
export declare type Bar = Omit<Foo, "c">;
export declare type Baz = Omit<Foo, "b" | "c">;
export declare function getBarA(bar: Bar): string;
export declare function getBazA(baz: Baz): string;
export {};
