//// [tests/cases/conformance/parser/ecmascript6/ComputedPropertyNames/parserComputedPropertyName23.ts] ////

//// [parserComputedPropertyName23.ts]
declare class C {
    get [e](): number 
}

/// [Declarations] ////



//// [parserComputedPropertyName23.d.ts]
declare class C {
    get [e](): number;
}
/// [Errors] ////

parserComputedPropertyName23.ts(2,10): error TS2304: Cannot find name 'e'.
parserComputedPropertyName23.ts(2,10): error TS4031: Public property '[e]' of exported class has or is using private name 'e'.


==== parserComputedPropertyName23.ts (2 errors) ====
    declare class C {
        get [e](): number 
             ~
!!! error TS2304: Cannot find name 'e'.
             ~
!!! error TS4031: Public property '[e]' of exported class has or is using private name 'e'.
    }