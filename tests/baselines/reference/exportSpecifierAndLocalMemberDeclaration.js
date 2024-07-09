//// [tests/cases/compiler/exportSpecifierAndLocalMemberDeclaration.ts] ////

//// [exportSpecifierAndLocalMemberDeclaration.ts]
declare module "m2" {
    module X {
        interface I { }
    }
    function Y();
    export { Y as X };
    function Z(): X.I;
}

declare module "m2" {
    function Z2(): X.I;
}

//// [exportSpecifierAndLocalMemberDeclaration.js]
