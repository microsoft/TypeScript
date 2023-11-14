//// [tests/cases/conformance/classes/indexMemberDeclarations/privateIndexer2.ts] ////

//// [privateIndexer2.ts]
// private indexers not allowed

var x = {
    private [x: string]: string;
}

var y: {
    private[x: string]: string;
}

/// [Declarations] ////



//// [privateIndexer2.d.ts]
declare var x: invalid;
declare var y: {
    private []: string;
};

/// [Errors] ////

privateIndexer2.ts(4,15): error TS1005: ']' expected.
privateIndexer2.ts(4,17): error TS2693: 'string' only refers to a type, but is being used as a value here.
privateIndexer2.ts(4,17): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
privateIndexer2.ts(4,23): error TS1005: ',' expected.
privateIndexer2.ts(4,24): error TS1136: Property assignment expected.
privateIndexer2.ts(4,26): error TS2693: 'string' only refers to a type, but is being used as a value here.
privateIndexer2.ts(4,26): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
privateIndexer2.ts(4,32): error TS1005: ',' expected.


==== privateIndexer2.ts (8 errors) ====
    // private indexers not allowed
    
    var x = {
        private [x: string]: string;
                  ~
!!! error TS1005: ']' expected.
                    ~~~~~~
!!! error TS2693: 'string' only refers to a type, but is being used as a value here.
                    ~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                          ~
!!! error TS1005: ',' expected.
                           ~
!!! error TS1136: Property assignment expected.
                             ~~~~~~
!!! error TS2693: 'string' only refers to a type, but is being used as a value here.
                             ~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                                   ~
!!! error TS1005: ',' expected.
    }
    
    var y: {
        private[x: string]: string;
    }