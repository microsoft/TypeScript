//// [tests/cases/compiler/specializedLambdaTypeArguments.ts] ////

//// [specializedLambdaTypeArguments.ts]
class X<A> {
	prop: X< <Tany>() => Tany >;
}
var a: X<boolean>;
 


//// [specializedLambdaTypeArguments.js]
var X = /** @class */ (function () {
    function X() {
    }
    return X;
}());
var a;
