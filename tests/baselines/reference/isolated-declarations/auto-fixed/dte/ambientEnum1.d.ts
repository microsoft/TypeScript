//// [tests/cases/compiler/ambientEnum1.ts] ////

//// [ambientEnum1.ts]
    declare enum E1 {
        y = 4.23
    }
    
    // Ambient enum with computer member
    declare enum E2 {
        x = 'foo'.length
    }

/// [Declarations] ////



//// [/.src/ambientEnum1.d.ts]
declare enum E1 {
    y = 4.23
}
declare enum E2 {
    x
}
/// [Errors] ////

ambientEnum1.ts(7,9): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
ambientEnum1.ts(7,13): error TS1066: In ambient enum declarations member initializer must be constant expression.


==== ambientEnum1.ts (2 errors) ====
        declare enum E1 {
            y = 4.23
        }
        
        // Ambient enum with computer member
        declare enum E2 {
            x = 'foo'.length
            ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                ~~~~~~~~~~~~
!!! error TS1066: In ambient enum declarations member initializer must be constant expression.
        }