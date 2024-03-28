//// [tests/cases/compiler/outModuleConcatUmd.ts] ////

//// [a.ts]
export class A { }

//// [b.ts]
import {A} from "./ref/a";
export class B extends A { }



!!!! File all.d.ts missing from original emit, but present in noCheck emit
//// [all.d.ts]
declare module "ref/a" {
    export class A {
    }
}
declare module "b" {
    import { A } from "ref/a";
    export class B extends A {
    }
}
