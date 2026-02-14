//// [tests/cases/compiler/declarationEmitQualifiedName.ts] ////

//// [e.ts]
export enum E {
    A = 'a',
    B = 'b',
}

//// [a.ts]
import { E } from './e.js'
export const A = {
    item: {
        a: E.A,
    },
} as const

//// [b.ts]
import { A } from './a.js'
export const B = { ...A } as const


//// [e.js]
export { E };
var E;
(function (E) {
    E["A"] = "a";
    E["B"] = "b";
})(E || (E = {}));
//// [a.js]
import { E } from './e.js';
export const A = {
    item: {
        a: E.A,
    },
};
//// [b.js]
import { A } from './a.js';
export const B = Object.assign({}, A);


//// [e.d.ts]
export declare enum E {
    A = "a",
    B = "b"
}
//// [a.d.ts]
import { E } from './e.js';
export declare const A: {
    readonly item: {
        readonly a: E.A;
    };
};
//// [b.d.ts]
export declare const B: {
    readonly item: {
        readonly a: import("./e.js").E.A;
    };
};
