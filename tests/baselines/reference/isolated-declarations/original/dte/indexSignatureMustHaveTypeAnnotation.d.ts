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
    [x]: string;
    [x: string]: any;
}
declare class C {
    [x]: string;
}
declare class C2 {
    [x: string]: any;
}
/// [Errors] ////

indexSignatureMustHaveTypeAnnotation.ts(3,5): error TS1169: A computed property name in an interface must refer to an expression whose type is a literal type or a 'unique symbol' type.
indexSignatureMustHaveTypeAnnotation.ts(3,6): error TS2304: Cannot find name 'x'.
indexSignatureMustHaveTypeAnnotation.ts(4,5): error TS1021: An index signature must have a type annotation.
indexSignatureMustHaveTypeAnnotation.ts(9,5): error TS1166: A computed property name in a class property declaration must have a simple literal type or a 'unique symbol' type.
indexSignatureMustHaveTypeAnnotation.ts(9,6): error TS2304: Cannot find name 'x'.
indexSignatureMustHaveTypeAnnotation.ts(9,6): error TS4031: Public property '[x]' of exported class has or is using private name 'x'.
indexSignatureMustHaveTypeAnnotation.ts(14,5): error TS1021: An index signature must have a type annotation.


==== indexSignatureMustHaveTypeAnnotation.ts (7 errors) ====
    interface I {
        // Used to be indexer, now it is a computed property
        [x]: string;
        ~~~
!!! error TS1169: A computed property name in an interface must refer to an expression whose type is a literal type or a 'unique symbol' type.
         ~
!!! error TS2304: Cannot find name 'x'.
        [x: string];
        ~~~~~~~~~~~~
!!! error TS1021: An index signature must have a type annotation.
    }
    
    class C {
        // Used to be indexer, now it is a computed property
        [x]: string
        ~~~
!!! error TS1166: A computed property name in a class property declaration must have a simple literal type or a 'unique symbol' type.
         ~
!!! error TS2304: Cannot find name 'x'.
         ~
!!! error TS4031: Public property '[x]' of exported class has or is using private name 'x'.
        
    }
    
    class C2 {
        [x: string]
        ~~~~~~~~~~~
!!! error TS1021: An index signature must have a type annotation.
    }