//// [higherKindedTypesLift3.ts]
interface StaticFunctor<CS<_TS>> {
    <AS, BS>(csas: CS<AS>, fmapstatic: (a: AS) => BS): CS<BS>;
}


interface LiftedResult<LC<_LT>> {
    <LA, LB>(lmap: (a: LA) => LB): (a: LC<LA>) => LC<LB>;
}

declare function lift<C<_T>>(fToLift: StaticFunctor<C>): LiftedResult<C>


declare const myArrayFunctor: StaticFunctor<Array>

const liftedArray = lift(myArrayFunctor);

declare function stringLength(strarg: string): number

const liftedStringLength = liftedArray(stringLength);

declare const arrayOfStrings: Array<string>;

const result = liftedStringLength(arrayOfStrings);
const expectedType: Array<number> = result;

const expectError = liftedStringLength(result)



//// [higherKindedTypesLift3.js]
"use strict";
var liftedArray = lift(myArrayFunctor);
var liftedStringLength = liftedArray(stringLength);
var result = liftedStringLength(arrayOfStrings);
var expectedType = result;
var expectError = liftedStringLength(result);
