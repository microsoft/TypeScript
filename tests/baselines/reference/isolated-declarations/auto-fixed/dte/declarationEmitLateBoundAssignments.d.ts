//// [tests/cases/compiler/declarationEmitLateBoundAssignments.ts] ////

//// [declarationEmitLateBoundAssignments.ts]
export function foo(): void {}
foo.bar = 12;
const _private = Symbol();
foo[_private] = "ok";
const strMem = "strMemName";
foo[strMem] = "ok";
const dashStrMem = "dashed-str-mem";
foo[dashStrMem] = "ok";
const numMem = 42;
foo[numMem] = "ok";

const x: string = foo[_private];
const y: string = foo[strMem];
const z: string = foo[numMem];
const a: string = foo[dashStrMem];

/// [Declarations] ////



//// [declarationEmitLateBoundAssignments.d.ts]
export declare function foo(): void;
//# sourceMappingURL=declarationEmitLateBoundAssignments.d.ts.map
/// [Errors] ////

declarationEmitLateBoundAssignments.ts(1,17): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.


==== declarationEmitLateBoundAssignments.ts (1 errors) ====
    export function foo(): void {}
                    ~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
    foo.bar = 12;
    const _private = Symbol();
    foo[_private] = "ok";
    const strMem = "strMemName";
    foo[strMem] = "ok";
    const dashStrMem = "dashed-str-mem";
    foo[dashStrMem] = "ok";
    const numMem = 42;
    foo[numMem] = "ok";
    
    const x: string = foo[_private];
    const y: string = foo[strMem];
    const z: string = foo[numMem];
    const a: string = foo[dashStrMem];