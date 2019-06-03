/// <reference path='fourslash.ts'/>

////module FindRef3 {
////	module SimpleClassTest {
////		export class Foo {
////			[|public [|{| "isWriteAccess": true, "isDefinition": true, "declarationRangeIndex": 0 |}foo|](): void {
////			}|]
////		}
////		export class Bar extends Foo {
////			[|public [|{| "isWriteAccess": true, "isDefinition": true, "declarationRangeIndex": 2 |}foo|](): void {
////			}|]
////		}
////	}
////
////	module SimpleInterfaceTest {
////		export interface IFoo {
////			[|[|{| "isDefinition": true, "declarationRangeIndex": 4 |}ifoo|](): void;|]
////		}
////		export interface IBar extends IFoo {
////			[|[|{| "isDefinition": true, "declarationRangeIndex": 6 |}ifoo|](): void;|]
////		}
////	}
////
////	module SimpleClassInterfaceTest {
////		export interface IFoo {
////			[|[|{| "isDefinition": true, "declarationRangeIndex": 8 |}icfoo|](): void;|]
////		}
////		export class Bar implements IFoo {
////			[|public [|{| "isWriteAccess": true, "isDefinition": true, "declarationRangeIndex": 10 |}icfoo|](): void {
////			}|]
////		}
////	}
////
////	module Test {
////		export interface IBase {
////			[|[|{| "isDefinition": true, "declarationRangeIndex": 12 |}field|]: string;|]
////			[|[|{| "isDefinition": true, "declarationRangeIndex": 14 |}method|](): void;|]
////		}
////
////		export interface IBlah extends IBase {
////			[|[|{| "isDefinition": true, "declarationRangeIndex": 16 |}field|]: string;|]
////		}
////
////		export interface IBlah2 extends IBlah {
////			[|[|{| "isDefinition": true, "declarationRangeIndex": 18 |}field|]: string;|]
////		}
////
////		export interface IDerived extends IBlah2 {
////			[|[|{| "isDefinition": true, "declarationRangeIndex": 20 |}method|](): void;|]
////		}
////
////		export class Bar implements IDerived {
////			[|public [|{| "isDefinition": true, "declarationRangeIndex": 22 |}field|]: string;|]
////			[|public [|{| "isWriteAccess": true, "isDefinition": true, "declarationRangeIndex": 24 |}method|](): void { }|]
////		}
////
////		export class BarBlah extends Bar {
////			[|public [|{| "isDefinition": true, "declarationRangeIndex": 26 |}field|]: string;|]
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
////		z.[|{| "isWriteAccess": true |}field|] = "";
////        z.[|method|]();
////	}
////}

const ranges = test.rangesByText();

const fooRanges = ranges.get("foo");
const [foo0, foo1, foo2] = fooRanges;
verify.referenceGroups(fooRanges, [
    { definition: "(method) SimpleClassTest.Foo.foo(): void", ranges: [foo0] },
    { definition: "(method) SimpleClassTest.Bar.foo(): void", ranges: [foo1, foo2] },
]);

const ifooRanges = ranges.get("ifoo");
const [ifoo0, ifoo1, ifoo2] = ifooRanges;
verify.referenceGroups(ifooRanges, [
    { definition: "(method) SimpleInterfaceTest.IFoo.ifoo(): void", ranges: [ifoo0] },
    { definition: "(method) SimpleInterfaceTest.IBar.ifoo(): void", ranges: [ifoo1, ifoo2] }
]);

const icfooRanges = ranges.get("icfoo");
const [icfoo0, icfoo1, icfoo2] = icfooRanges;
verify.referenceGroups(icfooRanges, [
    { definition: "(method) SimpleClassInterfaceTest.IFoo.icfoo(): void", ranges: [icfoo0] },
    { definition: "(method) SimpleClassInterfaceTest.Bar.icfoo(): void", ranges: [icfoo1, icfoo2] }
]);

const fieldRanges = ranges.get("field");
const [field0, field1, field2, field3, field4, field5] = fieldRanges;
verify.referenceGroups(fieldRanges, [
    { definition: "(property) Test.IBase.field: string", ranges: [field0] },
    { definition: "(property) Test.IBlah.field: string", ranges: [field1] },
    { definition: "(property) Test.IBlah2.field: string", ranges: [field2] },
    { definition: "(property) Test.Bar.field: string", ranges: [field3] },
    { definition: "(property) Test.BarBlah.field: string", ranges: [field4, field5] },
]);

const methodRanges = ranges.get("method");
const [method0, method1, method2, method3] = methodRanges;
verify.referenceGroups(methodRanges, [
    { definition: "(method) Test.IBase.method(): void", ranges: [method0] },
    { definition: "(method) Test.IDerived.method(): void", ranges: [method1] },
    { definition: "(method) Test.Bar.method(): void", ranges: [method2, method3] },
]);
