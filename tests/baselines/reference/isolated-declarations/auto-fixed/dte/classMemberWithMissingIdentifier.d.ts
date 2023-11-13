//// [tests/cases/compiler/classMemberWithMissingIdentifier.ts] ////

//// [classMemberWithMissingIdentifier.ts]
class C { 
    public {};
}

/// [Declarations] ////



//// [classMemberWithMissingIdentifier.d.ts]
declare class C {
    : invalid;
}

/// [Errors] ////

classMemberWithMissingIdentifier.ts(2,11): error TS1146: Declaration expected.
classMemberWithMissingIdentifier.ts(2,11): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
classMemberWithMissingIdentifier.ts(2,12): error TS1005: ';' expected.
classMemberWithMissingIdentifier.ts(3,1): error TS1128: Declaration or statement expected.


==== classMemberWithMissingIdentifier.ts (4 errors) ====
    class C { 
        public {};
              
!!! error TS1146: Declaration expected.
              
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
               ~
!!! error TS1005: ';' expected.
    }
    ~
!!! error TS1128: Declaration or statement expected.