//// [tests/cases/compiler/specializedLambdaTypeArguments.ts] ////

//// [specializedLambdaTypeArguments.ts]
class X<A> {
	prop: X< <Tany>() => Tany >;
}
var a: X<boolean>;
 


//// [specializedLambdaTypeArguments.js]
"use strict";
var X = /** @class */ (function () {
    function X() {
    }
    return X;
}());
var a;
