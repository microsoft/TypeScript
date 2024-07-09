//// [tests/cases/compiler/functionsWithModifiersInBlocks1.ts] ////

//// [functionsWithModifiersInBlocks1.ts]
{
   declare function f() { }
   export function f() { }
   declare export function f() { }
}

//// [functionsWithModifiersInBlocks1.js]
{
    export function f() { }
}
