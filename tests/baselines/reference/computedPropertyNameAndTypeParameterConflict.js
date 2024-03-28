//// [tests/cases/compiler/computedPropertyNameAndTypeParameterConflict.ts] ////

//// [computedPropertyNameAndTypeParameterConflict.ts]
declare const O: unique symbol;
declare class Bar<O> {
    [O]: number;
}



//// [computedPropertyNameAndTypeParameterConflict.js]


//// [computedPropertyNameAndTypeParameterConflict.d.ts]
declare const O: unique symbol;
declare class Bar<O> {
    [O]: number;
}
