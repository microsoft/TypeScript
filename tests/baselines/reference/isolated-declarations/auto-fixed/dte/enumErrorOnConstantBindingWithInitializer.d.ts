//// [tests/cases/conformance/enums/enumErrorOnConstantBindingWithInitializer.ts] ////

//// [enumErrorOnConstantBindingWithInitializer.ts]
type Thing = {
  value?: string | number;
};

declare const thing: Thing;
const temp: string | number | undefined = thing.value;
const value: string | number = temp === undefined ? "123" : thing.value;

enum E {
  test = value,
}


/// [Declarations] ////



//// [/.src/enumErrorOnConstantBindingWithInitializer.d.ts]
type Thing = {
    value?: string | number;
};
declare const thing: Thing;
declare const temp: string | number | undefined;
declare const value: string | number;
declare enum E {
    test
}
/// [Errors] ////

enumErrorOnConstantBindingWithInitializer.ts(7,7): error TS2322: Type 'string | number | undefined' is not assignable to type 'string | number'.
  Type 'undefined' is not assignable to type 'string | number'.
enumErrorOnConstantBindingWithInitializer.ts(10,3): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
enumErrorOnConstantBindingWithInitializer.ts(10,10): error TS18033: Type 'string | number' is not assignable to type 'number' as required for computed enum member values.
  Type 'string' is not assignable to type 'number'.


==== enumErrorOnConstantBindingWithInitializer.ts (3 errors) ====
    type Thing = {
      value?: string | number;
    };
    
    declare const thing: Thing;
    const temp: string | number | undefined = thing.value;
    const value: string | number = temp === undefined ? "123" : thing.value;
          ~~~~~
!!! error TS2322: Type 'string | number | undefined' is not assignable to type 'string | number'.
!!! error TS2322:   Type 'undefined' is not assignable to type 'string | number'.
    
    enum E {
      test = value,
      ~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
             ~~~~~
!!! error TS18033: Type 'string | number' is not assignable to type 'number' as required for computed enum member values.
!!! error TS18033:   Type 'string' is not assignable to type 'number'.
    }
    