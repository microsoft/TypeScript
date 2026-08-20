//// [variables.ts] ////
const x = "";
export function one() {
    return {} as typeof x;
}

export function two() {
    const y = "";
    return {} as typeof y;
}

export function three() {
    type Z = string;
    return {} as Z;
}
//// [variables.d.ts] ////
declare const x = "";
export declare function one(): typeof x;
export declare function two(): "";
export declare function three(): string;
export {};


//// [Diagnostics reported]
variables.ts(8,25): error TS9039: Type containing private name 'y' can't be used with --isolatedDeclarations.
variables.ts(13,18): error TS9039: Type containing private name 'Z' can't be used with --isolatedDeclarations.


==== variables.ts (2 errors) ====
    const x = "";
    export function one() {
        return {} as typeof x;
    }
    
    export function two() {
        const y = "";
        return {} as typeof y;
                            ~
!!! error TS9039: Type containing private name 'y' can't be used with --isolatedDeclarations.
!!! related TS9031 variables.ts:6:17: Add a return type to the function declaration.
    }
    
    export function three() {
        type Z = string;
        return {} as Z;
                     ~
!!! error TS9039: Type containing private name 'Z' can't be used with --isolatedDeclarations.
!!! related TS9031 variables.ts:11:17: Add a return type to the function declaration.
    }
