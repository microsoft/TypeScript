//// [tests/cases/conformance/parser/ecmascript6/Symbols/parserSymbolIndexer5.ts] ////

//// [parserSymbolIndexer5.ts]
var x = {
    [s: symbol]: ""
}

/// [Declarations] ////



//// [parserSymbolIndexer5.d.ts]
declare var x: invalid;
/// [Errors] ////

parserSymbolIndexer5.ts(2,6): error TS2304: Cannot find name 's'.
parserSymbolIndexer5.ts(2,7): error TS1005: ']' expected.
parserSymbolIndexer5.ts(2,9): error TS2552: Cannot find name 'symbol'. Did you mean 'Symbol'?
parserSymbolIndexer5.ts(2,9): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
parserSymbolIndexer5.ts(2,15): error TS1005: ',' expected.
parserSymbolIndexer5.ts(2,16): error TS1136: Property assignment expected.
parserSymbolIndexer5.ts(2,20): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
parserSymbolIndexer5.ts(3,1): error TS1005: ':' expected.


==== parserSymbolIndexer5.ts (8 errors) ====
    var x = {
        [s: symbol]: ""
         ~
!!! error TS2304: Cannot find name 's'.
          ~
!!! error TS1005: ']' expected.
            ~~~~~~
!!! error TS2552: Cannot find name 'symbol'. Did you mean 'Symbol'?
!!! related TS2728 lib.es2015.symbol.d.ts:--:--: 'Symbol' is declared here.
            ~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                  ~
!!! error TS1005: ',' expected.
                   ~
!!! error TS1136: Property assignment expected.
                       
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    }
    ~
!!! error TS1005: ':' expected.