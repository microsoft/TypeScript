//// [tests/cases/compiler/ambientExternalModuleWithRelativeModuleName.ts] ////

//// [ambientExternalModuleWithRelativeModuleName.ts]
declare module "./relativeModule" {
    var x: string;
}

declare module ".\\relativeModule" {
    var x: string;
}

//// [ambientExternalModuleWithRelativeModuleName.js]
