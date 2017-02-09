/// <reference path='fourslash.ts'/>

////interface IFoo<T> {
////    [|{| "isWriteAccess": true, "isDefinition": true |}doSomething|](v: T): T;
////}
////
////var x: IFoo<string>;
////x.[|doSomething|]("ss");
////
////var y: IFoo<number>;
////y.[|doSomething|](12);

const ranges = test.ranges();
const [r0, r1, r2] = ranges;
verify.referenceGroups(r0, [{ definition: "(method) IFoo<T>.doSomething(v: T): T", ranges }]);
verify.referenceGroups(r1, [
    { definition: "(method) IFoo<T>.doSomething(v: string): string", ranges: [r0, r2] },
    { definition: "(method) IFoo<string>.doSomething(v: string): string", ranges: [r1] }
]);
verify.referenceGroups(r2, [
    { definition: "(method) IFoo<T>.doSomething(v: number): number", ranges: [r0, r1] },
    { definition: "(method) IFoo<number>.doSomething(v: number): number", ranges: [r2] }
]);
