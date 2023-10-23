//// [tests/cases/compiler/typeUsedAsTypeLiteralIndex.ts] ////

//// [typeUsedAsTypeLiteralIndex.ts]
type K = number | string;
type T = {
    [K]: number;  // Did you mean to use 'P in K'?
}

const K1 = Symbol();
type T1 = {
    [K1]: number;
}

type K2 = "x" | "y";
type T2 = {
    [K2]: number;  // Did you mean to use 'K in K2'?
}

type K3 = number | string;
type T3 = {
    [K3]: number; // Did you mean to use 'K in K3'?
}

type K4 = number | string;
type T4 = {
    [K4]: number;
    k4: string;
}


/// [Declarations] ////



//// [/.src/typeUsedAsTypeLiteralIndex.d.ts]
type K = number | string;
type T = {};
declare const K1: invalid;
type T1 = {
    [K1]: number;
};
type K2 = "x" | "y";
type T2 = {};
type K3 = number | string;
type T3 = {};
type K4 = number | string;
type T4 = {
    k4: string;
};
/// [Errors] ////

typeUsedAsTypeLiteralIndex.ts(6,12): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.


==== typeUsedAsTypeLiteralIndex.ts (1 errors) ====
    type K = number | string;
    type T = {
        [K]: number;  // Did you mean to use 'P in K'?
    }
    
    const K1 = Symbol();
               ~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    type T1 = {
        [K1]: number;
    }
    
    type K2 = "x" | "y";
    type T2 = {
        [K2]: number;  // Did you mean to use 'K in K2'?
    }
    
    type K3 = number | string;
    type T3 = {
        [K3]: number; // Did you mean to use 'K in K3'?
    }
    
    type K4 = number | string;
    type T4 = {
        [K4]: number;
        k4: string;
    }
    