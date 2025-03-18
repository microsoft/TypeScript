//// [tests/cases/compiler/specializedLambdaTypeArguments.ts] ////

//// [specializedLambdaTypeArguments.ts]
class X<A> {
	prop: X< <Tany>() => Tany >;
}
var a: X<boolean>;
 


//// [specializedLambdaTypeArguments.js]
class X {
    prop;
}
var a;
