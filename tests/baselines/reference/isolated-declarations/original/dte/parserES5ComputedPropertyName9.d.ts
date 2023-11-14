//// [tests/cases/conformance/parser/ecmascript5/ComputedPropertyNames/parserES5ComputedPropertyName9.ts] ////

//// [parserES5ComputedPropertyName9.ts]
class C {
   [e]: Type
}

/// [Declarations] ////



//// [parserES5ComputedPropertyName9.d.ts]
declare class C {
    [e]: Type;
}

/// [Errors] ////

parserES5ComputedPropertyName9.ts(2,4): error TS1166: A computed property name in a class property declaration must have a simple literal type or a 'unique symbol' type.
parserES5ComputedPropertyName9.ts(2,5): error TS2304: Cannot find name 'e'.
parserES5ComputedPropertyName9.ts(2,5): error TS4031: Public property '[e]' of exported class has or is using private name 'e'.
parserES5ComputedPropertyName9.ts(2,9): error TS2304: Cannot find name 'Type'.
parserES5ComputedPropertyName9.ts(2,9): error TS4031: Public property '[e]' of exported class has or is using private name 'Type'.


==== parserES5ComputedPropertyName9.ts (5 errors) ====
    class C {
       [e]: Type
       ~~~
!!! error TS1166: A computed property name in a class property declaration must have a simple literal type or a 'unique symbol' type.
        ~
!!! error TS2304: Cannot find name 'e'.
        ~
!!! error TS4031: Public property '[e]' of exported class has or is using private name 'e'.
            ~~~~
!!! error TS2304: Cannot find name 'Type'.
            ~~~~
!!! error TS4031: Public property '[e]' of exported class has or is using private name 'Type'.
    }