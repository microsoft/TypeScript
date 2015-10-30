//// [tests/cases/compiler/outModuleConcatES6.ts] ////

//// [a.ts]

// This should be an error

export class A { }

//// [b.ts]
import {A} from "./ref/a";
export class B extends A { }

//// [all.js]
// This should be an error
//# sourceMappingURL=all.js.map

//// [all.d.ts]
declare module "tests/cases/compiler/ref/a" {
    export class A {
    }
}
declare module "tests/cases/compiler/b" {
    import { A } from "tests/cases/compiler/ref/a";
    export class B extends A {
    }
}
