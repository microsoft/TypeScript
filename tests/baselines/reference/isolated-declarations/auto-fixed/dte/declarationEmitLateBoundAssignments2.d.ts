//// [tests/cases/compiler/declarationEmitLateBoundAssignments2.ts] ////

//// [declarationEmitLateBoundAssignments2.ts]
// https://github.com/microsoft/TypeScript/issues/54811

const c = "C"
const num = 1
const numStr = "10"
const withWhitespace = "foo bar"
const emoji = "🤷‍♂️"

export function decl(): void {}
decl["B"] = 'foo'

export function decl2(): void {}
decl2[c] = 0

export function decl3(): void {}
decl3[77] = 0

export function decl4(): void {}
decl4[num] = 0

export function decl5(): void {}
decl5["101"] = 0

export function decl6(): void {}
decl6[numStr] = 0

export function decl7(): void {}
decl7["qwe rty"] = 0

export function decl8(): void {}
decl8[withWhitespace] = 0

export function decl9(): void {}
decl9["🤪"] = 0

export function decl10(): void {}
decl10[emoji] = 0

export const arrow: {
    (): void
    B: string
} = () => {}
arrow["B"] = 'bar'

export const arrow2 = (): void => {}
arrow2[c] = 100

export const arrow3: {
    (): void
    77: number
} = () => {}
arrow3[77] = 0

export const arrow4 = (): void => {}
arrow4[num] = 0

export const arrow5: {
    (): void
    "101": number
} = () => {}
arrow5["101"] = 0

export const arrow6 = (): void => {}
arrow6[numStr] = 0

export const arrow7: {
    (): void
    "qwe rty": number
} = () => {}
arrow7["qwe rty"] = 0

export const arrow8 = (): void => {}
arrow8[withWhitespace] = 0

export const arrow9: {
    (): void
    "🤪": number
} = () => {}
arrow9["🤪"] = 0

export const arrow10 = (): void => {}
arrow10[emoji] = 0


/// [Declarations] ////



//// [declarationEmitLateBoundAssignments2.d.ts]
export declare function decl(): void;
export declare function decl2(): void;
export declare function decl3(): void;
export declare function decl4(): void;
export declare function decl5(): void;
export declare function decl6(): void;
export declare function decl7(): void;
export declare function decl8(): void;
export declare function decl9(): void;
export declare function decl10(): void;
export declare const arrow: {
    (): void;
    B: string;
};
export declare const arrow2: invalid;
export declare const arrow3: {
    (): void;
    77: number;
};
export declare const arrow4: invalid;
export declare const arrow5: {
    (): void;
    "101": number;
};
export declare const arrow6: invalid;
export declare const arrow7: {
    (): void;
    "qwe rty": number;
};
export declare const arrow8: invalid;
export declare const arrow9: {
    (): void;
    "🤪": number;
};
export declare const arrow10: invalid;

/// [Errors] ////

declarationEmitLateBoundAssignments2.ts(9,17): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
declarationEmitLateBoundAssignments2.ts(12,17): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
declarationEmitLateBoundAssignments2.ts(15,17): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
declarationEmitLateBoundAssignments2.ts(18,17): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
declarationEmitLateBoundAssignments2.ts(21,17): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
declarationEmitLateBoundAssignments2.ts(24,17): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
declarationEmitLateBoundAssignments2.ts(27,17): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
declarationEmitLateBoundAssignments2.ts(30,17): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
declarationEmitLateBoundAssignments2.ts(33,17): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
declarationEmitLateBoundAssignments2.ts(36,17): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
declarationEmitLateBoundAssignments2.ts(45,14): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
declarationEmitLateBoundAssignments2.ts(45,14): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
declarationEmitLateBoundAssignments2.ts(54,14): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
declarationEmitLateBoundAssignments2.ts(54,14): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
declarationEmitLateBoundAssignments2.ts(63,14): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
declarationEmitLateBoundAssignments2.ts(63,14): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
declarationEmitLateBoundAssignments2.ts(72,14): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
declarationEmitLateBoundAssignments2.ts(72,14): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
declarationEmitLateBoundAssignments2.ts(81,14): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
declarationEmitLateBoundAssignments2.ts(81,14): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.


==== declarationEmitLateBoundAssignments2.ts (20 errors) ====
    // https://github.com/microsoft/TypeScript/issues/54811
    
    const c = "C"
    const num = 1
    const numStr = "10"
    const withWhitespace = "foo bar"
    const emoji = "🤷‍♂️"
    
    export function decl(): void {}
                    ~~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
    decl["B"] = 'foo'
    
    export function decl2(): void {}
                    ~~~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
    decl2[c] = 0
    
    export function decl3(): void {}
                    ~~~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
    decl3[77] = 0
    
    export function decl4(): void {}
                    ~~~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
    decl4[num] = 0
    
    export function decl5(): void {}
                    ~~~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
    decl5["101"] = 0
    
    export function decl6(): void {}
                    ~~~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
    decl6[numStr] = 0
    
    export function decl7(): void {}
                    ~~~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
    decl7["qwe rty"] = 0
    
    export function decl8(): void {}
                    ~~~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
    decl8[withWhitespace] = 0
    
    export function decl9(): void {}
                    ~~~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
    decl9["🤪"] = 0
    
    export function decl10(): void {}
                    ~~~~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
    decl10[emoji] = 0
    
    export const arrow: {
        (): void
        B: string
    } = () => {}
    arrow["B"] = 'bar'
    
    export const arrow2 = (): void => {}
                 ~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                 ~~~~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
    arrow2[c] = 100
    
    export const arrow3: {
        (): void
        77: number
    } = () => {}
    arrow3[77] = 0
    
    export const arrow4 = (): void => {}
                 ~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                 ~~~~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
    arrow4[num] = 0
    
    export const arrow5: {
        (): void
        "101": number
    } = () => {}
    arrow5["101"] = 0
    
    export const arrow6 = (): void => {}
                 ~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                 ~~~~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
    arrow6[numStr] = 0
    
    export const arrow7: {
        (): void
        "qwe rty": number
    } = () => {}
    arrow7["qwe rty"] = 0
    
    export const arrow8 = (): void => {}
                 ~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                 ~~~~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
    arrow8[withWhitespace] = 0
    
    export const arrow9: {
        (): void
        "🤪": number
    } = () => {}
    arrow9["🤪"] = 0
    
    export const arrow10 = (): void => {}
                 ~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                 ~~~~~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
    arrow10[emoji] = 0
    