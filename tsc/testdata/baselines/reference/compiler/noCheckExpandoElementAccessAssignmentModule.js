//// [tests/cases/compiler/noCheckExpandoElementAccessAssignmentModule.ts] ////

//// [noCheckExpandoElementAccessAssignmentModule.ts]
const k = "bar";
export function foo() {}
foo[k] = 1;




//// [noCheckExpandoElementAccessAssignmentModule.d.ts]
export declare function foo(): void;
export declare namespace foo {
    var bar: number;
}
