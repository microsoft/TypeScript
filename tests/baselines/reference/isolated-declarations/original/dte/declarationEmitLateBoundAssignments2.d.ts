//// [tests/cases/compiler/declarationEmitLateBoundAssignments2.ts] ////

//// [declarationEmitLateBoundAssignments2.ts]
// https://github.com/microsoft/TypeScript/issues/54811

const c = "C"
const num = 1
const numStr = "10"
const withWhitespace = "foo bar"
const emoji = "🤷‍♂️"

export function decl() {}
decl["B"] = 'foo'

export function decl2() {}
decl2[c] = 0

export function decl3() {}
decl3[77] = 0

export function decl4() {}
decl4[num] = 0

export function decl5() {}
decl5["101"] = 0

export function decl6() {}
decl6[numStr] = 0

export function decl7() {}
decl7["qwe rty"] = 0

export function decl8() {}
decl8[withWhitespace] = 0

export function decl9() {}
decl9["🤪"] = 0

export function decl10() {}
decl10[emoji] = 0

export const arrow = () => {}
arrow["B"] = 'bar'

export const arrow2 = () => {}
arrow2[c] = 100

export const arrow3 = () => {}
arrow3[77] = 0

export const arrow4 = () => {}
arrow4[num] = 0

export const arrow5 = () => {}
arrow5["101"] = 0

export const arrow6 = () => {}
arrow6[numStr] = 0

export const arrow7 = () => {}
arrow7["qwe rty"] = 0

export const arrow8 = () => {}
arrow8[withWhitespace] = 0

export const arrow9 = () => {}
arrow9["🤪"] = 0

export const arrow10 = () => {}
arrow10[emoji] = 0


/// [Declarations] ////



//// [declarationEmitLateBoundAssignments2.d.ts]
export declare function decl(): invalid;
export declare function decl2(): invalid;
export declare function decl3(): invalid;
export declare function decl4(): invalid;
export declare function decl5(): invalid;
export declare function decl6(): invalid;
export declare function decl7(): invalid;
export declare function decl8(): invalid;
export declare function decl9(): invalid;
export declare function decl10(): invalid;
export declare const arrow: invalid;
export declare const arrow2: invalid;
export declare const arrow3: invalid;
export declare const arrow4: invalid;
export declare const arrow5: invalid;
export declare const arrow6: invalid;
export declare const arrow7: invalid;
export declare const arrow8: invalid;
export declare const arrow9: invalid;
export declare const arrow10: invalid;
/// [Errors] ////

declarationEmitLateBoundAssignments2.ts(9,17): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
declarationEmitLateBoundAssignments2.ts(9,17): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
declarationEmitLateBoundAssignments2.ts(12,17): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
declarationEmitLateBoundAssignments2.ts(12,17): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
declarationEmitLateBoundAssignments2.ts(15,17): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
declarationEmitLateBoundAssignments2.ts(15,17): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
declarationEmitLateBoundAssignments2.ts(18,17): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
declarationEmitLateBoundAssignments2.ts(18,17): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
declarationEmitLateBoundAssignments2.ts(21,17): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
declarationEmitLateBoundAssignments2.ts(21,17): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
declarationEmitLateBoundAssignments2.ts(24,17): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
declarationEmitLateBoundAssignments2.ts(24,17): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
declarationEmitLateBoundAssignments2.ts(27,17): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
declarationEmitLateBoundAssignments2.ts(27,17): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
declarationEmitLateBoundAssignments2.ts(30,17): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
declarationEmitLateBoundAssignments2.ts(30,17): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
declarationEmitLateBoundAssignments2.ts(33,17): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
declarationEmitLateBoundAssignments2.ts(33,17): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
declarationEmitLateBoundAssignments2.ts(36,17): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
declarationEmitLateBoundAssignments2.ts(36,17): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
declarationEmitLateBoundAssignments2.ts(39,14): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
declarationEmitLateBoundAssignments2.ts(39,14): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
declarationEmitLateBoundAssignments2.ts(42,14): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
declarationEmitLateBoundAssignments2.ts(42,14): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
declarationEmitLateBoundAssignments2.ts(45,14): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
declarationEmitLateBoundAssignments2.ts(45,14): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
declarationEmitLateBoundAssignments2.ts(48,14): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
declarationEmitLateBoundAssignments2.ts(48,14): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
declarationEmitLateBoundAssignments2.ts(51,14): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
declarationEmitLateBoundAssignments2.ts(51,14): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
declarationEmitLateBoundAssignments2.ts(54,14): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
declarationEmitLateBoundAssignments2.ts(54,14): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
declarationEmitLateBoundAssignments2.ts(57,14): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
declarationEmitLateBoundAssignments2.ts(57,14): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
declarationEmitLateBoundAssignments2.ts(60,14): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
declarationEmitLateBoundAssignments2.ts(60,14): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
declarationEmitLateBoundAssignments2.ts(63,14): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
declarationEmitLateBoundAssignments2.ts(63,14): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
declarationEmitLateBoundAssignments2.ts(66,14): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
declarationEmitLateBoundAssignments2.ts(66,14): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.


==== declarationEmitLateBoundAssignments2.ts (40 errors) ====
    // https://github.com/microsoft/TypeScript/issues/54811
    
    const c = "C"
    const num = 1
    const numStr = "10"
    const withWhitespace = "foo bar"
    const emoji = "🤷‍♂️"
    
    export function decl() {}
                    ~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                    ~~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
    decl["B"] = 'foo'
    
    export function decl2() {}
                    ~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                    ~~~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
    decl2[c] = 0
    
    export function decl3() {}
                    ~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                    ~~~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
    decl3[77] = 0
    
    export function decl4() {}
                    ~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                    ~~~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
    decl4[num] = 0
    
    export function decl5() {}
                    ~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                    ~~~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
    decl5["101"] = 0
    
    export function decl6() {}
                    ~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                    ~~~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
    decl6[numStr] = 0
    
    export function decl7() {}
                    ~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                    ~~~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
    decl7["qwe rty"] = 0
    
    export function decl8() {}
                    ~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                    ~~~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
    decl8[withWhitespace] = 0
    
    export function decl9() {}
                    ~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                    ~~~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
    decl9["🤪"] = 0
    
    export function decl10() {}
                    ~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                    ~~~~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
    decl10[emoji] = 0
    
    export const arrow = () => {}
                 ~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                 ~~~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
    arrow["B"] = 'bar'
    
    export const arrow2 = () => {}
                 ~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                 ~~~~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
    arrow2[c] = 100
    
    export const arrow3 = () => {}
                 ~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                 ~~~~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
    arrow3[77] = 0
    
    export const arrow4 = () => {}
                 ~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                 ~~~~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
    arrow4[num] = 0
    
    export const arrow5 = () => {}
                 ~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                 ~~~~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
    arrow5["101"] = 0
    
    export const arrow6 = () => {}
                 ~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                 ~~~~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
    arrow6[numStr] = 0
    
    export const arrow7 = () => {}
                 ~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                 ~~~~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
    arrow7["qwe rty"] = 0
    
    export const arrow8 = () => {}
                 ~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                 ~~~~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
    arrow8[withWhitespace] = 0
    
    export const arrow9 = () => {}
                 ~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                 ~~~~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
    arrow9["🤪"] = 0
    
    export const arrow10 = () => {}
                 ~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                 ~~~~~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
    arrow10[emoji] = 0
    