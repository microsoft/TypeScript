//// [tests/cases/conformance/parser/ecmascript5/ComputedPropertyNames/parserES5ComputedPropertyName10.ts] ////

//// [parserES5ComputedPropertyName10.ts]
class C {
   [e] = 1
}

/// [Declarations] ////



//// [parserES5ComputedPropertyName10.d.ts]
declare class C {
    [e]: number;
}

/// [Errors] ////

parserES5ComputedPropertyName10.ts(2,4): error TS1166: A computed property name in a class property declaration must have a simple literal type or a 'unique symbol' type.
parserES5ComputedPropertyName10.ts(2,4): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
parserES5ComputedPropertyName10.ts(2,5): error TS2304: Cannot find name 'e'.
parserES5ComputedPropertyName10.ts(2,5): error TS4031: Public property '[e]' of exported class has or is using private name 'e'.


==== parserES5ComputedPropertyName10.ts (4 errors) ====
    class C {
       [e] = 1
       ~~~
!!! error TS1166: A computed property name in a class property declaration must have a simple literal type or a 'unique symbol' type.
       ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        ~
!!! error TS2304: Cannot find name 'e'.
        ~
!!! error TS4031: Public property '[e]' of exported class has or is using private name 'e'.
    }