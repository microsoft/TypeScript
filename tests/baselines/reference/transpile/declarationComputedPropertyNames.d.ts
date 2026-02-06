//// [declarationComputedPropertyNames.ts] ////
export namespace presentNs {
    export const a = Symbol();
}

const aliasing = Symbol;

export type A = {
    [missing]: number,
    [ns.missing]: number,
    [presentNs.a]: number,
    [Symbol.iterator]: number,
    [globalThis.Symbol.toStringTag]: number,
    [(globalThis.Symbol).unscopables]: number,
    [aliasing.isConcatSpreadable]: number,
    [1]: number,
    ["2"]: number,
    [(missing2)]: number,
    [Math.random() > 0.5 ? "f1" : "f2"]: number,
};

export interface B {
    [missing]: number,
    [ns.missing]: number,
    [presentNs.a]: number,
    [Symbol.iterator]: number,
    [globalThis.Symbol.toStringTag]: number,
    [(globalThis.Symbol).unscopables]: number,
    [aliasing.isConcatSpreadable]: number,
    [1]: number,
    ["2"]: number,
    [(missing2)]: number,
    [Math.random() > 0.5 ? "f1" : "f2"]: number,
}

export class C {
    [missing]: number = 1;
    [ns.missing]: number = 1;
    [presentNs.a]: number = 1;
    [Symbol.iterator]: number = 1;
    [globalThis.Symbol.toStringTag]: number = 1;
    [(globalThis.Symbol).unscopables]: number = 1;
    [aliasing.isConcatSpreadable]: number = 1;
    [1]: number = 1;
    ["2"]: number = 1;
    [(missing2)]: number = 1;
    [Math.random() > 0.5 ? "f1" : "f2"]: number = 1;
}

export const D = {
    [missing]: 1,
    [ns.missing]: 1,
    [presentNs.a]: 1,
    [Symbol.iterator]: 1,
    [globalThis.Symbol.toStringTag]: 1,
    [(globalThis.Symbol).unscopables]: 1,
    [aliasing.isConcatSpreadable]: 1,
    [1]: 1,
    ["2"]: 1,
    [(missing2)]: 1,
    [Math.random() > 0.5 ? "f1" : "f2"]: 1,
};
//// [declarationComputedPropertyNames.d.ts] ////
export declare namespace presentNs {
    const a: unique symbol;
}
declare const aliasing: SymbolConstructor;
export type A = {
    [missing]: number;
    [ns.missing]: number;
    [presentNs.a]: number;
    [Symbol.iterator]: number;
    [globalThis.Symbol.toStringTag]: number;
    [aliasing.isConcatSpreadable]: number;
    [1]: number;
    ["2"]: number;
};
export interface B {
    [missing]: number;
    [ns.missing]: number;
    [presentNs.a]: number;
    [Symbol.iterator]: number;
    [globalThis.Symbol.toStringTag]: number;
    [aliasing.isConcatSpreadable]: number;
    [1]: number;
    ["2"]: number;
}
export declare class C {
    [x: number]: number;
    [Symbol.iterator]: number;
    [globalThis.Symbol.toStringTag]: number;
    [1]: number;
    ["2"]: number;
}
export declare const D: {
    [x: string]: number;
    [x: number]: number;
    [presentNs.a]: number;
    [aliasing.toStringTag]: number;
    1: number;
    "2": number;
};
export {};


//// [Diagnostics reported]
declarationComputedPropertyNames.ts(2,18): error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations.
declarationComputedPropertyNames.ts(5,7): error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations.
declarationComputedPropertyNames.ts(13,5): error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations.
declarationComputedPropertyNames.ts(17,5): error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations.
declarationComputedPropertyNames.ts(18,5): error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations.
declarationComputedPropertyNames.ts(27,5): error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations.
declarationComputedPropertyNames.ts(31,5): error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations.
declarationComputedPropertyNames.ts(32,5): error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations.
declarationComputedPropertyNames.ts(36,5): error TS9038: Computed property names on class or object literals cannot be inferred with --isolatedDeclarations.
declarationComputedPropertyNames.ts(37,5): error TS9038: Computed property names on class or object literals cannot be inferred with --isolatedDeclarations.
declarationComputedPropertyNames.ts(38,5): error TS9038: Computed property names on class or object literals cannot be inferred with --isolatedDeclarations.
declarationComputedPropertyNames.ts(41,5): error TS9038: Computed property names on class or object literals cannot be inferred with --isolatedDeclarations.
declarationComputedPropertyNames.ts(42,5): error TS9038: Computed property names on class or object literals cannot be inferred with --isolatedDeclarations.
declarationComputedPropertyNames.ts(45,5): error TS9038: Computed property names on class or object literals cannot be inferred with --isolatedDeclarations.
declarationComputedPropertyNames.ts(46,5): error TS9038: Computed property names on class or object literals cannot be inferred with --isolatedDeclarations.
declarationComputedPropertyNames.ts(50,5): error TS9038: Computed property names on class or object literals cannot be inferred with --isolatedDeclarations.
declarationComputedPropertyNames.ts(51,5): error TS9038: Computed property names on class or object literals cannot be inferred with --isolatedDeclarations.
declarationComputedPropertyNames.ts(52,5): error TS9038: Computed property names on class or object literals cannot be inferred with --isolatedDeclarations.
declarationComputedPropertyNames.ts(55,5): error TS9038: Computed property names on class or object literals cannot be inferred with --isolatedDeclarations.
declarationComputedPropertyNames.ts(56,5): error TS9038: Computed property names on class or object literals cannot be inferred with --isolatedDeclarations.
declarationComputedPropertyNames.ts(59,5): error TS9038: Computed property names on class or object literals cannot be inferred with --isolatedDeclarations.
declarationComputedPropertyNames.ts(60,5): error TS9038: Computed property names on class or object literals cannot be inferred with --isolatedDeclarations.


==== declarationComputedPropertyNames.ts (22 errors) ====
    export namespace presentNs {
        export const a = Symbol();
                     ~
!!! error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations.
!!! related TS9027 declarationComputedPropertyNames.ts:2:18: Add a type annotation to the variable a.
    }
    
    const aliasing = Symbol;
          ~~~~~~~~
!!! error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations.
!!! related TS9027 declarationComputedPropertyNames.ts:5:7: Add a type annotation to the variable aliasing.
    
    export type A = {
        [missing]: number,
        [ns.missing]: number,
        [presentNs.a]: number,
        [Symbol.iterator]: number,
        [globalThis.Symbol.toStringTag]: number,
        [(globalThis.Symbol).unscopables]: number,
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
!!! error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations.
        [aliasing.isConcatSpreadable]: number,
        [1]: number,
        ["2"]: number,
        [(missing2)]: number,
        ~~~~~~~~~~~~
!!! error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations.
        [Math.random() > 0.5 ? "f1" : "f2"]: number,
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
!!! error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations.
    };
    
    export interface B {
        [missing]: number,
        [ns.missing]: number,
        [presentNs.a]: number,
        [Symbol.iterator]: number,
        [globalThis.Symbol.toStringTag]: number,
        [(globalThis.Symbol).unscopables]: number,
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
!!! error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations.
        [aliasing.isConcatSpreadable]: number,
        [1]: number,
        ["2"]: number,
        [(missing2)]: number,
        ~~~~~~~~~~~~
!!! error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations.
        [Math.random() > 0.5 ? "f1" : "f2"]: number,
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
!!! error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations.
    }
    
    export class C {
        [missing]: number = 1;
        ~~~~~~~~~
!!! error TS9038: Computed property names on class or object literals cannot be inferred with --isolatedDeclarations.
        [ns.missing]: number = 1;
        ~~~~~~~~~~~~
!!! error TS9038: Computed property names on class or object literals cannot be inferred with --isolatedDeclarations.
        [presentNs.a]: number = 1;
        ~~~~~~~~~~~~~
!!! error TS9038: Computed property names on class or object literals cannot be inferred with --isolatedDeclarations.
        [Symbol.iterator]: number = 1;
        [globalThis.Symbol.toStringTag]: number = 1;
        [(globalThis.Symbol).unscopables]: number = 1;
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
!!! error TS9038: Computed property names on class or object literals cannot be inferred with --isolatedDeclarations.
        [aliasing.isConcatSpreadable]: number = 1;
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
!!! error TS9038: Computed property names on class or object literals cannot be inferred with --isolatedDeclarations.
        [1]: number = 1;
        ["2"]: number = 1;
        [(missing2)]: number = 1;
        ~~~~~~~~~~~~
!!! error TS9038: Computed property names on class or object literals cannot be inferred with --isolatedDeclarations.
        [Math.random() > 0.5 ? "f1" : "f2"]: number = 1;
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
!!! error TS9038: Computed property names on class or object literals cannot be inferred with --isolatedDeclarations.
    }
    
    export const D = {
        [missing]: 1,
        ~~~~~~~~~
!!! error TS9038: Computed property names on class or object literals cannot be inferred with --isolatedDeclarations.
!!! related TS9027 declarationComputedPropertyNames.ts:49:14: Add a type annotation to the variable D.
        [ns.missing]: 1,
        ~~~~~~~~~~~~
!!! error TS9038: Computed property names on class or object literals cannot be inferred with --isolatedDeclarations.
!!! related TS9027 declarationComputedPropertyNames.ts:49:14: Add a type annotation to the variable D.
        [presentNs.a]: 1,
        ~~~~~~~~~~~~~
!!! error TS9038: Computed property names on class or object literals cannot be inferred with --isolatedDeclarations.
!!! related TS9027 declarationComputedPropertyNames.ts:49:14: Add a type annotation to the variable D.
        [Symbol.iterator]: 1,
        [globalThis.Symbol.toStringTag]: 1,
        [(globalThis.Symbol).unscopables]: 1,
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
!!! error TS9038: Computed property names on class or object literals cannot be inferred with --isolatedDeclarations.
!!! related TS9027 declarationComputedPropertyNames.ts:49:14: Add a type annotation to the variable D.
        [aliasing.isConcatSpreadable]: 1,
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
!!! error TS9038: Computed property names on class or object literals cannot be inferred with --isolatedDeclarations.
!!! related TS9027 declarationComputedPropertyNames.ts:49:14: Add a type annotation to the variable D.
        [1]: 1,
        ["2"]: 1,
        [(missing2)]: 1,
        ~~~~~~~~~~~~
!!! error TS9038: Computed property names on class or object literals cannot be inferred with --isolatedDeclarations.
!!! related TS9027 declarationComputedPropertyNames.ts:49:14: Add a type annotation to the variable D.
        [Math.random() > 0.5 ? "f1" : "f2"]: 1,
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
!!! error TS9038: Computed property names on class or object literals cannot be inferred with --isolatedDeclarations.
!!! related TS9027 declarationComputedPropertyNames.ts:49:14: Add a type annotation to the variable D.
    };
    
