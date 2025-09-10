//// [tests/cases/compiler/exportSpecifierAndExportedMemberDeclaration.ts] ////

//// [exportSpecifierAndExportedMemberDeclaration.ts]
declare module "m2" {
    export namespace X {
        interface I { }
    }
    function Y();
    export { Y as X };
    function Z(): X.I;
}

declare module "m2" {
    function Z2(): X.I;
}

//// [exportSpecifierAndExportedMemberDeclaration.js]
