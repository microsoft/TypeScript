//// [tests/cases/compiler/exactSpellingSuggestion.ts] ////

//// [exactSpellingSuggestion.ts]
// Fixes #16245 -- always suggest the exact match, even when
// other options are very close
enum U8 {
    BIT_0 = 1 << 0,
    BIT_1 = 1 << 1,
    BIT_2 = 1 << 2
}

U8.bit_2


/// [Declarations] ////



//// [exactSpellingSuggestion.d.ts]
declare enum U8 {
    BIT_0 = 1,
    BIT_1 = 2,
    BIT_2 = 4
}

/// [Errors] ////

exactSpellingSuggestion.ts(4,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
exactSpellingSuggestion.ts(5,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
exactSpellingSuggestion.ts(6,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
exactSpellingSuggestion.ts(9,4): error TS2551: Property 'bit_2' does not exist on type 'typeof U8'. Did you mean 'BIT_2'?


==== exactSpellingSuggestion.ts (4 errors) ====
    // Fixes #16245 -- always suggest the exact match, even when
    // other options are very close
    enum U8 {
        BIT_0 = 1 << 0,
        ~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        BIT_1 = 1 << 1,
        ~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        BIT_2 = 1 << 2
        ~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    }
    
    U8.bit_2
       ~~~~~
!!! error TS2551: Property 'bit_2' does not exist on type 'typeof U8'. Did you mean 'BIT_2'?
!!! related TS2728 exactSpellingSuggestion.ts:6:5: 'BIT_2' is declared here.
    