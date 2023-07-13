//// [tests/cases/compiler/callExpressionWithTypeParameterConstrainedToOuterTypeParameter.ts] ////

//// [callExpressionWithTypeParameterConstrainedToOuterTypeParameter.ts]
interface I<T> {
    <U extends T>(u: U): U;
}
var i: I<string>;
var y = i(""); // y should be string

//// [callExpressionWithTypeParameterConstrainedToOuterTypeParameter.js]
var i;
var y = i(""); // y should be string
