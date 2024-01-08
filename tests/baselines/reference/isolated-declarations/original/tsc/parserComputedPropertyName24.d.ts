//// [tests/cases/conformance/parser/ecmascript6/ComputedPropertyNames/parserComputedPropertyName24.ts] ////

//// [parserComputedPropertyName24.ts]
class C {
    set [e](v) { }
}

/// [Declarations] ////



//// [parserComputedPropertyName24.d.ts]
declare class C {
}

/// [Errors] ////

parserComputedPropertyName24.ts(2,10): error TS2304: Cannot find name 'e'.


==== parserComputedPropertyName24.ts (1 errors) ====
    class C {
        set [e](v) { }
             ~
!!! error TS2304: Cannot find name 'e'.
    }