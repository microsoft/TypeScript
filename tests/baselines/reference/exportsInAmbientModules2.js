//// [tests/cases/compiler/exportsInAmbientModules2.ts] ////

//// [external.d.ts]
export default class C {}

//// [main.ts]
declare module "M" {
    export * from "external"
}

//// [main.js]
