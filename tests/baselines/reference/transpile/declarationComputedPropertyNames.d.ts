//// [declarationComputedPropertyNames.ts] ////
export namespace presentNs {
    export const a = Symbol();
}

export type A = {
    [missing]: number,
    [ns.missing]: number,
    [presentNs.a]: number,
    [Symbol.iterator]: number,
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
    [1]: 1,
    ["2"]: 1,
    [(missing2)]: 1,
    [Math.random() > 0.5 ? "f1" : "f2"]: 1,
};
//// [declarationComputedPropertyNames.d.ts] ////
export declare namespace presentNs {
    const a: unique symbol;
}
export type A = {
    [missing]: number;
    [ns.missing]: number;
    [presentNs.a]: number;
    [Symbol.iterator]: number;
    [1]: number;
    ["2"]: number;
};
export interface B {
    [missing]: number;
    [ns.missing]: number;
    [presentNs.a]: number;
    [Symbol.iterator]: number;
    [1]: number;
    ["2"]: number;
}
export declare class C {
    [1]: number;
    ["2"]: number;
}
export declare const D: {
    [x: string]: number;
    [x: number]: number;
    [presentNs.a]: number;
    1: number;
    "2": number;
};


//// [Diagnostics reported]
declarationComputedPropertyNames.ts(2,18): error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations.
declarationComputedPropertyNames.ts(12,5): error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations.
declarationComputedPropertyNames.ts(13,5): error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations.
declarationComputedPropertyNames.ts(23,5): error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations.
declarationComputedPropertyNames.ts(24,5): error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations.
declarationComputedPropertyNames.ts(28,5): error TS9038: Computed property names on class or object literals cannot be inferred with --isolatedDeclarations.
declarationComputedPropertyNames.ts(29,5): error TS9038: Computed property names on class or object literals cannot be inferred with --isolatedDeclarations.
declarationComputedPropertyNames.ts(30,5): error TS9038: Computed property names on class or object literals cannot be inferred with --isolatedDeclarations.
declarationComputedPropertyNames.ts(31,5): error TS9038: Computed property names on class or object literals cannot be inferred with --isolatedDeclarations.
declarationComputedPropertyNames.ts(34,5): error TS9038: Computed property names on class or object literals cannot be inferred with --isolatedDeclarations.
declarationComputedPropertyNames.ts(35,5): error TS9038: Computed property names on class or object literals cannot be inferred with --isolatedDeclarations.
declarationComputedPropertyNames.ts(39,5): error TS9038: Computed property names on class or object literals cannot be inferred with --isolatedDeclarations.
declarationComputedPropertyNames.ts(40,5): error TS9038: Computed property names on class or object literals cannot be inferred with --isolatedDeclarations.
declarationComputedPropertyNames.ts(41,5): error TS9038: Computed property names on class or object literals cannot be inferred with --isolatedDeclarations.
declarationComputedPropertyNames.ts(42,5): error TS9038: Computed property names on class or object literals cannot be inferred with --isolatedDeclarations.
declarationComputedPropertyNames.ts(45,5): error TS9038: Computed property names on class or object literals cannot be inferred with --isolatedDeclarations.
declarationComputedPropertyNames.ts(46,5): error TS9038: Computed property names on class or object literals cannot be inferred with --isolatedDeclarations.


==== declarationComputedPropertyNames.ts (17 errors) ====
    export namespace presentNs {
        export const a = Symbol();
                     ~
!!! error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations.
!!! related TS9027 declarationComputedPropertyNames.ts:2:18: Add a type annotation to the variable a.
    }
    
    export type A = {
        [missing]: number,
        [ns.missing]: number,
        [presentNs.a]: number,
        [Symbol.iterator]: number,
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
        ~~~~~~~~~~~~~~~~~
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
!!! related TS9027 declarationComputedPropertyNames.ts:38:14: Add a type annotation to the variable D.
        [ns.missing]: 1,
        ~~~~~~~~~~~~
!!! error TS9038: Computed property names on class or object literals cannot be inferred with --isolatedDeclarations.
!!! related TS9027 declarationComputedPropertyNames.ts:38:14: Add a type annotation to the variable D.
        [presentNs.a]: 1,
        ~~~~~~~~~~~~~
!!! error TS9038: Computed property names on class or object literals cannot be inferred with --isolatedDeclarations.
!!! related TS9027 declarationComputedPropertyNames.ts:38:14: Add a type annotation to the variable D.
        [Symbol.iterator]: 1,
        ~~~~~~~~~~~~~~~~~
!!! error TS9038: Computed property names on class or object literals cannot be inferred with --isolatedDeclarations.
!!! related TS9027 declarationComputedPropertyNames.ts:38:14: Add a type annotation to the variable D.
        [1]: 1,
        ["2"]: 1,
        [(missing2)]: 1,
        ~~~~~~~~~~~~
!!! error TS9038: Computed property names on class or object literals cannot be inferred with --isolatedDeclarations.
!!! related TS9027 declarationComputedPropertyNames.ts:38:14: Add a type annotation to the variable D.
        [Math.random() > 0.5 ? "f1" : "f2"]: 1,
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
!!! error TS9038: Computed property names on class or object literals cannot be inferred with --isolatedDeclarations.
!!! related TS9027 declarationComputedPropertyNames.ts:38:14: Add a type annotation to the variable D.
    };
    
