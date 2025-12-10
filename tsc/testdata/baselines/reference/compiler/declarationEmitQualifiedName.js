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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.E = void 0;
var E;
(function (E) {
    E["A"] = "a";
    E["B"] = "b";
})(E || (exports.E = E = {}));
//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.A = void 0;
const e_js_1 = require("./e.js");
exports.A = {
    item: {
        a: e_js_1.E.A,
    },
};
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.B = void 0;
const a_js_1 = require("./a.js");
exports.B = Object.assign({}, a_js_1.A);


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
