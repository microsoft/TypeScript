//// [tests/cases/compiler/omitTypeTestErrors01.ts] ////

//// [omitTypeTestErrors01.ts]
interface Foo {
    a: string;
    b: number;
    c: boolean;
}

export type Bar = Omit<Foo, "c">;
export type Baz = Omit<Foo, "b" | "c">;

export function getBarC(bar: Bar) {
    return bar.c;
}

export function getBazB(baz: Baz) {
    return baz.b;
}



//// [omitTypeTestErrors01.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBarC = getBarC;
exports.getBazB = getBazB;
function getBarC(bar) {
    return bar.c;
}
function getBazB(baz) {
    return baz.b;
}


//// [omitTypeTestErrors01.d.ts]
interface Foo {
    a: string;
    b: number;
    c: boolean;
}
export type Bar = Omit<Foo, "c">;
export type Baz = Omit<Foo, "b" | "c">;
export declare function getBarC(bar: Bar): any;
export declare function getBazB(baz: Baz): any;
export {};
