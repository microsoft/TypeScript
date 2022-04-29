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
exports.__esModule = true;
exports.getBazB = exports.getBarC = void 0;
function getBarC(bar) {
    return bar.c;
}
exports.getBarC = getBarC;
function getBazB(baz) {
    return baz.b;
}
exports.getBazB = getBazB;


//// [omitTypeTestErrors01.d.ts]
interface Foo {
    a: string;
    b: number;
    c: boolean;
}
export declare type Bar = Omit<Foo, "c">;
export declare type Baz = Omit<Foo, "b" | "c">;
export declare function getBarC(bar: Bar): any;
export declare function getBazB(baz: Baz): any;
export {};
