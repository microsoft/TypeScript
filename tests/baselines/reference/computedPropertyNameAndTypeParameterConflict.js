//// [tests/cases/compiler/computedPropertyNameAndTypeParameterConflict.ts] ////

//// [computedPropertyNameAndTypeParameterConflict.ts]
declare const O: unique symbol;
declare class Bar<O> {
    [O]: number;
}



//// [computedPropertyNameAndTypeParameterConflict.js]
"use strict";


//// [computedPropertyNameAndTypeParameterConflict.d.ts]
declare const O: unique symbol;
declare class Bar<O> {
    [O]: number;
}
