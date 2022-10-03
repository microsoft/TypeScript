//// [tests/cases/compiler/importsInAmbientModules1.ts] ////

//// [external.d.ts]
export var x: number

//// [main.ts]
declare module "M" {
    import {x} from "external"
}

//// [main.js]
