/// <reference path='fourslash.ts'/>

////interface IFoo<T> {
////    [|[|{| "isDefinition": true, "declarationRangeIndex": 0 |}doSomething|](v: T): T;|]
////}
////
////var x: IFoo<string>;
////x.[|doSomething|]("ss");
////
////var y: IFoo<number>;
////y.[|doSomething|](12);

const [rDef, ...ranges] = test.ranges();
verify.singleReferenceGroup("(method) IFoo<T>.doSomething(v: T): T", ranges);
