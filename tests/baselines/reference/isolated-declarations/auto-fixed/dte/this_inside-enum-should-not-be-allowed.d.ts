//// [tests/cases/compiler/this_inside-enum-should-not-be-allowed.ts] ////

//// [this_inside-enum-should-not-be-allowed.ts]
enum TopLevelEnum {
    ThisWasAllowedButShouldNotBe = this // Should not be allowed
}

module ModuleEnum {
    enum EnumInModule {
        WasADifferentError = this // this was handled as if this was in a module
    }
}

/// [Declarations] ////



//// [/.src/this_inside-enum-should-not-be-allowed.d.ts]
declare enum TopLevelEnum {
    ThisWasAllowedButShouldNotBe
}
declare namespace ModuleEnum {
}
/// [Errors] ////

this_inside-enum-should-not-be-allowed.ts(2,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
this_inside-enum-should-not-be-allowed.ts(2,36): error TS2332: 'this' cannot be referenced in current location.
this_inside-enum-should-not-be-allowed.ts(7,30): error TS2332: 'this' cannot be referenced in current location.


==== this_inside-enum-should-not-be-allowed.ts (3 errors) ====
    enum TopLevelEnum {
        ThisWasAllowedButShouldNotBe = this // Should not be allowed
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                                       ~~~~
!!! error TS2332: 'this' cannot be referenced in current location.
    }
    
    module ModuleEnum {
        enum EnumInModule {
            WasADifferentError = this // this was handled as if this was in a module
                                 ~~~~
!!! error TS2332: 'this' cannot be referenced in current location.
        }
    }