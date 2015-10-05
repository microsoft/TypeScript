//// [tests/cases/compiler/outModuleConcatES6.ts] ////

//// [a.ts]

// This should be an error

export class A { }

//// [b.ts]
import {A} from "./ref/a";
export class B extends A { }

//// [a.js]
// This should be an error
export class A {
}
//# sourceMappingURL=a.js.map//// [b.js]
import { A } from "./ref/a";
export class B extends A {
}
//# sourceMappingURL=b.js.map//// [all.js]
// This should be an error
//# sourceMappingURL=all.js.map

//// [a.d.ts]
export declare class A {
}
//// [b.d.ts]
import { A } from "./ref/a";
export declare class B extends A {
}
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
