/// <reference path='fourslash.ts'/>

////interface IFoo<T> {
////    [|{| "isDefinition": true |}doSomething|](v: T): T;
////}
////
////var x: IFoo<string>;
////x.[|doSomething|]("ss");
////
////var y: IFoo<number>;
////y.[|doSomething|](12);

verify.singleReferenceGroup("(method) IFoo<T>.doSomething(v: T): T");
