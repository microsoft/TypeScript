//// [declarationEmitThisPredicatesWithPrivateName02.ts]

interface Foo {
    a: string;
    b: number;
    c: boolean;
}

export const obj = {
    m(): this is Foo {
        let dis = this as Foo;
        return dis.a != null && dis.b != null && dis.c != null;
    }
}

//// [declarationEmitThisPredicatesWithPrivateName02.js]
"use strict";
exports.obj = {
    m: function () {
        var dis = this;
        return dis.a != null && dis.b != null && dis.c != null;
    }
};
