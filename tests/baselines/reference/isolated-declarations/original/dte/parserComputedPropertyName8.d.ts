//// [tests/cases/conformance/parser/ecmascript6/ComputedPropertyNames/parserComputedPropertyName8.ts] ////

//// [parserComputedPropertyName8.ts]
class C {
   public [e]
}

/// [Declarations] ////



//// [parserComputedPropertyName8.d.ts]
declare class C {
    [e]: invalid;
}

/// [Errors] ////

parserComputedPropertyName8.ts(2,11): error TS1166: A computed property name in a class property declaration must have a simple literal type or a 'unique symbol' type.
parserComputedPropertyName8.ts(2,11): error TS9012: Property must have an explicit type annotation with --isolatedDeclarations
parserComputedPropertyName8.ts(2,12): error TS2304: Cannot find name 'e'.
parserComputedPropertyName8.ts(2,12): error TS4031: Public property '[e]' of exported class has or is using private name 'e'.


==== parserComputedPropertyName8.ts (4 errors) ====
    class C {
       public [e]
              ~~~
!!! error TS1166: A computed property name in a class property declaration must have a simple literal type or a 'unique symbol' type.
              ~~~
!!! error TS9012: Property must have an explicit type annotation with --isolatedDeclarations
!!! related TS9029 parserComputedPropertyName8.ts:2:11: Add a type annotation to the property [e]
               ~
!!! error TS2304: Cannot find name 'e'.
               ~
!!! error TS4031: Public property '[e]' of exported class has or is using private name 'e'.
    }