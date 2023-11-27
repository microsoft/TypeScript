//// [tests/cases/compiler/noEmitOnError.ts] ////

//// [noEmitOnError.ts]
var x: number = "";


/// [Declarations] ////



//// [noEmitOnError.d.ts]
declare var x: number;
//# sourceMappingURL=noEmitOnError.d.ts.map
/// [Errors] ////

noEmitOnError.ts(1,5): error TS2322: Type 'string' is not assignable to type 'number'.


==== noEmitOnError.ts (1 errors) ====
    var x: number = "";
        ~
!!! error TS2322: Type 'string' is not assignable to type 'number'.
    