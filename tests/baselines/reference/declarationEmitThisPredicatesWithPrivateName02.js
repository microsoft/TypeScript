//// [tests/cases/conformance/declarationEmit/typePredicates/declarationEmitThisPredicatesWithPrivateName02.ts] ////

//// [declarationEmitThisPredicatesWithPrivateName02.ts]
interface Foo {
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

//// [declarationEmitThisPredicatesWithPrivateName02.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obj = void 0;
exports.obj = {
    m: function () {
        var dis = this;
        return dis.a != null && dis.b != null && dis.c != null;
    }
};


//// [declarationEmitThisPredicatesWithPrivateName02.d.ts]
interface Foo {
    a: string;
    b: number;
    c: boolean;
}
export declare const obj: {
    m(): this is Foo;
};
export {};
