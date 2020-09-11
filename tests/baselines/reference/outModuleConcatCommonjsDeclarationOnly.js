//// [tests/cases/compiler/outModuleConcatCommonjsDeclarationOnly.ts] ////

//// [a.ts]
export class A { }

//// [b.ts]
import {A} from "./ref/a";
export class B extends A { }




//// [all.d.ts]
declare module "out/ref/a" {
    export class A {
    }
}
declare module "out/b" {
    import { A } from "out/ref/a";
    export class B extends A {
    }
}
