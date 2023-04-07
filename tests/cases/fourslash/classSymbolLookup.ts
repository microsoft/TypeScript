/// <reference path="fourslash.ts" />

// Issue #53247

//// class Foo<T extends Object, C extends {}> {
////     private constructor(value : T, context: C){ }
////     static readonly makeFoo = <C extends {}>(context : C) => 
////         <T extends Object>(value : T) => 
////             new Foo<T, C>(value, context);
//// }
//// const x = Foo.makeFoo<{}>;
//// x({});

verify.encodedSemanticClassificationsLength("2020", 75);
verify.getSemanticDiagnostics([]);