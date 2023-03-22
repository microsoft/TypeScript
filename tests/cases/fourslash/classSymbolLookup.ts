/// <reference path="fourslash.ts" />

// Issue #53247

//// class Foo<T extends Object, C extends {}> {
////     private constructor(value : T, context: C){ }

////     static readonly makeFoo = <C extends {}>(context : C) => 
////         <T extends Object>(value : T) => 
////             new Foo<T, C>(value, context);
//// }

//// const x = Foo.makeFoo<{}>;  //// Cannot find name 'Foo'.ts(2304)
////                             //// 'Foo' only refers to a type, but 
////                             //// is being used as a namespace here.ts(2702)

//// x({}); // 👍 `const x: <{}>(context: {}) => <T>(value: T) => Foo<T, {}>`

verify.encodedSemanticClassificationsLength("2020", 75);
verify.getSemanticDiagnostics([]);