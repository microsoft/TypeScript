//// [tests/cases/compiler/outModuleConcatCommonjsDeclarationOnly.ts] ////

//// [a.ts]
export class A { }

//// [b.ts]
import {A} from "./ref/a";
export class B extends A { }




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
