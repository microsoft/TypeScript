//// [tests/cases/compiler/partiallyAmbientClodule.ts] ////

//// [partiallyAmbientClodule.ts]
declare module foo {
    export function x(): any;
}
class foo { } // Legal, because module is ambient

//// [partiallyAmbientClodule.js]
class foo {
} // Legal, because module is ambient
