//// [tests/cases/compiler/importsInAmbientModules2.ts] ////

//// [external.d.ts]
export default class C {}

//// [main.ts]
declare module "M" {
    import C from "external"
}

//// [main.js]
