/// <reference path='fourslash.ts' />

// @strict: true

//// interface Effect<A, E, R> {
////   _A: (_: void) => A;
////   _E: (_: void) => E;
////   _R: (_: void) => R;
////
////   pipe<A, B>(this: A, f: (a: A) => B): B;
////
////   pipe<A, B, C>(this: A, f: (a: A) => B, f2: (b: B) => C): C;
//// }
////
//// type ServiceA = "@BLANK";
////
//// declare const effect: Effect<number, never, ServiceA>;
////
//// declare function toString<A, E, R>(fa: Effect<A, E, R>): Effect<string, E, R>;
//// declare function test<A, E>(fa: Effect<A, E, never>): Effect<A, E, never>;
////
//// effect./*1*/pipe(toString, [|test|]);

verify.quickInfoAt("1", `(method) Effect<number, never, "@BLANK">.pipe<Effect<number, never, "@BLANK">, Effect<string, never, "@BLANK">, Effect<string, never, never>>(this: Effect<number, never, "@BLANK">, f: (a: Effect<number, never, "@BLANK">) => Effect<string, never, "@BLANK">, f2: (b: Effect<string, never, "@BLANK">) => Effect<string, never, never>): Effect<string, never, never> (+1 overload)`);

verify.getSemanticDiagnostics([{
    message: "Argument of type '<A, E>(fa: Effect<A, E, never>) => Effect<A, E, never>' is not assignable to parameter of type '(b: Effect<string, never, \"@BLANK\">) => Effect<string, never, never>'.\n  Types of parameters 'fa' and 'b' are incompatible.\n    Type 'Effect<string, never, \"@BLANK\">' is not assignable to type 'Effect<string, never, never>'.\n      Type '\"@BLANK\"' is not assignable to type 'never'.",
    code: ts.Diagnostics.Argument_of_type_0_is_not_assignable_to_parameter_of_type_1.code,
}]);
