//// [tests/cases/compiler/expandoFunctionBlockShadowing.ts] ////

//// [expandoFunctionBlockShadowing.ts]
// https://github.com/microsoft/TypeScript/issues/56538

export function X(): void {}
if (Math.random()) {
  const X: { test?: any } = {};
  X.test = 1;
}

export function Y(): void {}
Y.test = "foo";
const aliasTopY = Y;
if (Math.random()) {
  const Y = function Y() {}
  Y.test = 42;

  const topYcheck: { (): void; test: string } = aliasTopY;
  const blockYcheck: { (): void; test: number } = Y;
}

/// [Declarations] ////



//// [expandoFunctionBlockShadowing.d.ts]
export declare function X(): void;
export declare function Y(): void;
//# sourceMappingURL=expandoFunctionBlockShadowing.d.ts.map
/// [Errors] ////

expandoFunctionBlockShadowing.ts(10,1): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.


==== expandoFunctionBlockShadowing.ts (1 errors) ====
    // https://github.com/microsoft/TypeScript/issues/56538
    
    export function X(): void {}
    if (Math.random()) {
      const X: { test?: any } = {};
      X.test = 1;
    }
    
    export function Y(): void {}
    Y.test = "foo";
    ~~~~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
    const aliasTopY = Y;
    if (Math.random()) {
      const Y = function Y() {}
      Y.test = 42;
    
      const topYcheck: { (): void; test: string } = aliasTopY;
      const blockYcheck: { (): void; test: number } = Y;
    }