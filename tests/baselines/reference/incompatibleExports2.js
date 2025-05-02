//// [tests/cases/compiler/incompatibleExports2.ts] ////

//// [incompatibleExports2.ts]
declare module "foo" { 
    export interface x { a: string } 
    interface y { a: Date }
    export = y;
}

//// [incompatibleExports2.js]
