//// [tests/cases/compiler/importsInAmbientModules3.ts] ////

//// [external.d.ts]
export default class C {}

//// [main.ts]
declare module "M" {
    import C = require("external");
}

//// [main.js]
