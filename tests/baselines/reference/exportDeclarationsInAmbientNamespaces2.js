//// [tests/cases/compiler/exportDeclarationsInAmbientNamespaces2.ts] ////

//// [exportDeclarationsInAmbientNamespaces2.ts]
declare module "mod" {
    export var x: number;
}

declare namespace N {
    export { x } from "mod"; // Error
}



//// [exportDeclarationsInAmbientNamespaces2.js]
