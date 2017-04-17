/// <reference path='fourslash.ts'/>

////module FindRef3 {
////	module SimpleClassTest {
////		export class Foo {
////			public [|{| "isWriteAccess": true, "isDefinition": true |}foo|](): void {
////			}
////		}
////		export class Bar extends Foo {
////			public [|{| "isWriteAccess": true, "isDefinition": true |}foo|](): void {
////			}
////		}
////	}
////
////	module SimpleInterfaceTest {
////		export interface IFoo {
////			[|{| "isWriteAccess": true, "isDefinition": true |}ifoo|](): void;
////		}
////		export interface IBar extends IFoo {
////			[|{| "isWriteAccess": true, "isDefinition": true |}ifoo|](): void;
////		}
////	}
////
////	module SimpleClassInterfaceTest {
////		export interface IFoo {
////			[|{| "isWriteAccess": true, "isDefinition": true |}icfoo|](): void;
////		}
////		export class Bar implements IFoo {
////			public [|{| "isWriteAccess": true, "isDefinition": true |}icfoo|](): void {
////			}
////		}
////	}
////
////	module Test {
////		export interface IBase {
////			[|{| "isWriteAccess": true, "isDefinition": true |}field|]: string;
////			[|{| "isWriteAccess": true, "isDefinition": true |}method|](): void;
////		}
////
////		export interface IBlah extends IBase {
////			[|{| "isWriteAccess": true, "isDefinition": true |}field|]: string;
////		}
////
////		export interface IBlah2 extends IBlah {
////			[|{| "isWriteAccess": true, "isDefinition": true |}field|]: string;
////		}
////
////		export interface IDerived extends IBlah2 {
////			[|{| "isWriteAccess": true, "isDefinition": true |}method|](): void;
////		}
////
////		export class Bar implements IDerived {
////			public [|{| "isWriteAccess": true, "isDefinition": true |}field|]: string;
////			public [|{| "isWriteAccess": true, "isDefinition": true |}method|](): void { }
////		}
////
////		export class BarBlah extends Bar {
////			public [|{| "isWriteAccess": true, "isDefinition": true |}field|]: string;
////		}
////	}
////
////	function test() {
////		var x = new SimpleClassTest.Bar();
////		x.[|foo|]();
////
////		var y: SimpleInterfaceTest.IBar = null;
////		y.[|ifoo|]();
////
////        var w: SimpleClassInterfaceTest.Bar = null;
////        w.[|icfoo|]();
////
////		var z = new Test.BarBlah();
////		z.[|field|] = "";
////        z.[|method|]();
////	}
////}

const ranges = test.rangesByText();

const fooRanges = ranges.get("foo");
const [foo0, foo1, foo2] = fooRanges;
verify.referenceGroups(foo0, [{ definition: "(method) SimpleClassTest.Foo.foo(): void", ranges: fooRanges }]);
verify.referenceGroups([foo1, foo2], [
    { definition: "(method) SimpleClassTest.Foo.foo(): void", ranges: [foo0] },
    { definition: "(method) SimpleClassTest.Bar.foo(): void", ranges: [foo1, foo2] }
]);

const ifooRanges = ranges.get("ifoo");
const [ifoo0, ifoo1, ifoo2] = ifooRanges;
verify.referenceGroups(ifoo0, [{ definition: "(method) SimpleInterfaceTest.IFoo.ifoo(): void", ranges: ifooRanges }]);
verify.referenceGroups([ifoo1, ifoo2], [
    { definition: "(method) SimpleInterfaceTest.IFoo.ifoo(): void", ranges: [ifoo0] },
    { definition: "(method) SimpleInterfaceTest.IBar.ifoo(): void", ranges: [ifoo1, ifoo2] }
]);

const icfooRanges = ranges.get("icfoo");
const [icfoo0, icfoo1, icfoo2] = icfooRanges;
verify.referenceGroups(icfoo0, [{ definition: "(method) SimpleClassInterfaceTest.IFoo.icfoo(): void", ranges: icfooRanges }]);
verify.referenceGroups([icfoo1, icfoo2], [
    { definition: "(method) SimpleClassInterfaceTest.IFoo.icfoo(): void", ranges: [icfoo0] },
    { definition: "(method) SimpleClassInterfaceTest.Bar.icfoo(): void", ranges: [icfoo1, icfoo2] }
]);

const fieldRanges = ranges.get("field");
const [field0, field1, field2, field3, field4, field5] = fieldRanges;
verify.referenceGroups(field0, [{ definition: "(property) Test.IBase.field: string", ranges: fieldRanges }]);
verify.referenceGroups(field1, [
    { definition: "(property) Test.IBase.field: string", ranges: [field0] },
    { definition: "(property) Test.IBlah.field: string", ranges: fieldRanges.slice(1) }
]);
verify.referenceGroups(field2, [
    { definition: "(property) Test.IBase.field: string", ranges: [field0] },
    { definition: "(property) Test.IBlah.field: string", ranges: [field1] },
    { definition: "(property) Test.IBlah2.field: string", ranges: fieldRanges.slice(2) }
]);
verify.referenceGroups(field3, [
    { definition: "(property) Test.IBase.field: string", ranges: [field0] },
    { definition: "(property) Test.IBlah.field: string", ranges: [field1] },
    { definition: "(property) Test.IBlah2.field: string", ranges: [field2] },
    { definition: "(property) Test.Bar.field: string", ranges: fieldRanges.slice(3) }
]);
verify.referenceGroups([field4, field5], [
    { definition: "(property) Test.IBase.field: string", ranges: [field0] },
    { definition: "(property) Test.IBlah.field: string", ranges: [field1] },
    { definition: "(property) Test.IBlah2.field: string", ranges: [field2] },
    { definition: "(property) Test.Bar.field: string", ranges: [field3] },
    { definition: "(property) Test.BarBlah.field: string", ranges: fieldRanges.slice(4) }
]);

const methodRanges = ranges.get("method");
const [method0, method1, method2, method3] = methodRanges;
verify.referenceGroups(method0, [{ definition: "(method) Test.IBase.method(): void", ranges: methodRanges }]);
verify.referenceGroups(method1, [
    { definition: "(method) Test.IBase.method(): void", ranges: [method0] },
    { definition: "(method) Test.IDerived.method(): void", ranges: methodRanges.slice(1) }
]);
verify.referenceGroups([method2, method3], [
    { definition: "(method) Test.IBase.method(): void", ranges: [method0] },
    { definition: "(method) Test.IDerived.method(): void", ranges: [method1] },
    { definition: "(method) Test.Bar.method(): void", ranges: methodRanges.slice(2) }
]);
