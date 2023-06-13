//// [tests/cases/compiler/multipleExportAssignmentsInAmbientDeclaration.ts] ////

//// [multipleExportAssignmentsInAmbientDeclaration.ts]
declare module "m1" {
    var a: number
    var b: number;
    export = a;
    export = b;
}

//// [multipleExportAssignmentsInAmbientDeclaration.js]
