//// [tests/cases/compiler/noCheckExpandoElementAccessAssignment.ts] ////

//// [noCheckExpandoElementAccessAssignment.ts]
const k = "bar";
foo[k] = 1;
function foo() {}




//// [noCheckExpandoElementAccessAssignment.d.ts]
declare const k = "bar";
declare function foo(): void;
declare namespace foo {
    var bar: number;
}
