//// [tests/cases/compiler/lateBoundFunctionMemberAssignmentDeclarations.ts] ////

//// [index.ts]
export function foo(): void {}
foo.bar = 12;
const _private = Symbol();
foo[_private] = "ok";

const x: string = foo[_private];


/// [Declarations] ////



//// [index.d.ts]
export declare function foo(): void;
/// [Errors] ////

index.ts(1,17): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.


==== index.ts (1 errors) ====
    export function foo(): void {}
                    ~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
    foo.bar = 12;
    const _private = Symbol();
    foo[_private] = "ok";
    
    const x: string = foo[_private];
    