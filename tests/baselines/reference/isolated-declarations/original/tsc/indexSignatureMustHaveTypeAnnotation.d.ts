//// [tests/cases/compiler/indexSignatureMustHaveTypeAnnotation.ts] ////

//// [indexSignatureMustHaveTypeAnnotation.ts]
interface I {
    // Used to be indexer, now it is a computed property
    [x]: string;
    [x: string];
}

class C {
    // Used to be indexer, now it is a computed property
    [x]: string
    
}

class C2 {
    [x: string]
}

/// [Declarations] ////



//// [/.src/indexSignatureMustHaveTypeAnnotation.d.ts]
interface I {
    [x: string]: any;
}
declare class C {
    [x]: string;
}
declare class C2 {
    [x: string]: any;
}
/// [Errors] ////

indexSignatureMustHaveTypeAnnotation.ts(9,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.


==== indexSignatureMustHaveTypeAnnotation.ts (1 errors) ====
    interface I {
        // Used to be indexer, now it is a computed property
        [x]: string;
        [x: string];
    }
    
    class C {
        // Used to be indexer, now it is a computed property
        [x]: string
        ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        
    }
    
    class C2 {
        [x: string]
    }