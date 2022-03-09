//// [declarationEmitThisPredicates02.ts]
export interface Foo {
    a: string;
    b: number;
    c: boolean;
}

export const obj = {
    m(): this is Foo {
        let dis = this as {} as Foo;
        return dis.a != null && dis.b != null && dis.c != null;
    }
}

//// [declarationEmitThisPredicates02.js]
"use strict";
exports.__esModule = true;
exports.obj = void 0;
exports.obj = {
    m: function () {
        var dis = this;
        return dis.a != null && dis.b != null && dis.c != null;
    }
};


//// [declarationEmitThisPredicates02.d.ts]
export interface Foo {
    a: string;
    b: number;
    c: boolean;
}
export declare const obj: {
    m(): this is Foo;
};
