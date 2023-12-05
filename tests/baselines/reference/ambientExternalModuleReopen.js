//// [tests/cases/compiler/ambientExternalModuleReopen.ts] ////

//// [ambientExternalModuleReopen.ts]
declare module "fs" {
    var x: string;
}
declare module 'fs' {
    var y: number;
}

//// [ambientExternalModuleReopen.js]
