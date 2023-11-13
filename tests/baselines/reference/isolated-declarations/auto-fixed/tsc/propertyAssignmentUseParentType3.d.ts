//// [tests/cases/conformance/salsa/propertyAssignmentUseParentType3.ts] ////

//// [propertyAssignmentUseParentType3.ts]
// don't use the parent type if it's a function declaration (#33741)

function foo1(): number {
    return 123;
}
foo1.toFixed = "";

function foo2(): any[] {
    return [];
}
foo2.join = "";

function foo3(): string {
    return "";
}
foo3.trim = "";

function foo4(): ({x: number}) {
    return {x: 123};
}
foo4.x = "456";


/// [Declarations] ////



//// [propertyAssignmentUseParentType3.d.ts]
declare function foo1(): number;
declare namespace foo1 {
    var toFixed: string;
}
declare function foo2(): any[];
declare namespace foo2 {
    var join: string;
}
declare function foo3(): string;
declare namespace foo3 {
    var trim: string;
}
declare function foo4(): ({
    x: number;
});
declare namespace foo4 {
    var x: string;
}
