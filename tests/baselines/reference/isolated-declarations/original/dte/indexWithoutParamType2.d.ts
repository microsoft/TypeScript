//// [tests/cases/compiler/indexWithoutParamType2.ts] ////

//// [indexWithoutParamType2.ts]
class C {
    // Used to be indexer, now it is a computed property
    [x]: string
}

/// [Declarations] ////



//// [/.src/indexWithoutParamType2.d.ts]
declare class C {
    [x]: string;
}
/// [Errors] ////

indexWithoutParamType2.ts(3,5): error TS1166: A computed property name in a class property declaration must have a simple literal type or a 'unique symbol' type.
indexWithoutParamType2.ts(3,6): error TS2304: Cannot find name 'x'.
indexWithoutParamType2.ts(3,6): error TS4031: Public property '[x]' of exported class has or is using private name 'x'.


==== indexWithoutParamType2.ts (3 errors) ====
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