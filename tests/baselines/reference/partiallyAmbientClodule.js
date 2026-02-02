//// [tests/cases/compiler/partiallyAmbientClodule.ts] ////

//// [partiallyAmbientClodule.ts]
declare namespace foo {
    export function x(): any;
}
class foo { } // Legal, because module is ambient

//// [partiallyAmbientClodule.js]
class foo {
} // Legal, because module is ambient
