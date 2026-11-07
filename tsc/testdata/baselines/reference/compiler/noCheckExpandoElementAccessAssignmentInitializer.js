//// [tests/cases/compiler/noCheckExpandoElementAccessAssignmentInitializer.ts] ////

//// [noCheckExpandoElementAccessAssignmentInitializer.ts]
const k = "bar";
const foo = () => {};
foo[k] = 1;




//// [noCheckExpandoElementAccessAssignmentInitializer.d.ts]
declare const k = "bar";
declare function foo(): void;
declare namespace foo {
    var bar: number;
}
