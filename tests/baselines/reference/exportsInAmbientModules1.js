//// [tests/cases/compiler/exportsInAmbientModules1.ts] ////

//// [external.d.ts]
export var x: number

//// [main.ts]
declare module "M" {
    export {x} from "external"
}

//// [main.js]
