//// [tests/cases/compiler/emptyDeclarationEmitIsModule.ts] ////

//// [module.ts]
import * as i from "./index";
class Foo {}
//// [index.ts]
import {} from "./module";
export interface Bar {
    x: string
}

//// [index.js]
export {};
//// [module.js]
class Foo {
}
export {};


//// [index.d.ts]
export interface Bar {
    x: string;
}
//// [module.d.ts]
export {};
