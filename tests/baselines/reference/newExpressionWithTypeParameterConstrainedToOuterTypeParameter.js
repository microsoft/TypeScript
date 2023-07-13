//// [tests/cases/compiler/newExpressionWithTypeParameterConstrainedToOuterTypeParameter.ts] ////

//// [newExpressionWithTypeParameterConstrainedToOuterTypeParameter.ts]
interface I<T> {
    new <U extends T>(u: U): U;
}
var i: I<string>;
var y = new i(""); // y should be string

//// [newExpressionWithTypeParameterConstrainedToOuterTypeParameter.js]
var i;
var y = new i(""); // y should be string
