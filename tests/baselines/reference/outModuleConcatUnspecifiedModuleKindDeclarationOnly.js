//// [tests/cases/compiler/outModuleConcatUnspecifiedModuleKindDeclarationOnly.ts] ////

//// [a.ts]
export class A { } // module

//// [b.ts]
var x = 0; // global



//// [out.d.ts]
declare module "a" {
    export class A {
    }
}
declare var x: number;
