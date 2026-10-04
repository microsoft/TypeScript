//// [tests/cases/compiler/classExtendsAcrossFiles.ts] ////

//// [a.ts]
import { b } from './b';
export const a = {
    f: () => {
        class A { }
        class B extends A { }
        b.f();
    }
};
//// [b.ts]
import { a } from './a';
export const b = {
    f: () => {
        class A { }
        class B extends A { }
        a.f();
    }
};

//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = void 0;
const a_1 = require("./a");
exports.b = {
    f: () => {
        class A {
        }
        class B extends A {
        }
        a_1.a.f();
    }
};
//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
const b_1 = require("./b");
exports.a = {
    f: () => {
        class A {
        }
        class B extends A {
        }
        b_1.b.f();
    }
};
