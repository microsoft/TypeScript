/// <reference path='fourslash.ts'/>

////module FindRef3 {
////	module SimpleClassTest {
////		export class Foo {
////			public foo(): void {
////			}
////		}
////		export class Bar extends Foo {
////			public foo(): void {
////			}
////		}
////	}
////
////	module SimpleInterfaceTest {
////		export interface IFoo {
////			foo(): void;
////		}
////		export interface IBar extends IFoo {
////			foo(): void;
////		}
////	}
////
////	module SimpleClassInterfaceTest {
////		export interface IFoo {
////			foo(): void;
////		}
////		export class Bar implements IFoo {
////			public foo(): void {
////			}
////		}
////	}
////
////	module Test {
////		export interface IBase {
////			field: string;
////			method(): void;
////		}
////
////		export interface IBlah extends IBase {
////			field: string;
////		}
////
////		export interface IBlah2 extends IBlah {
////			field: string;
////		}
////
////		export interface IDerived extends IBlah2 {
////			method(): void;
////		}
////
////		export class Bar implements IDerived {
////			public field: string;
////			public method(): void { }
////		}
////
////		export class BarBlah extends Bar {
////			public field: string;
////		}
////	}
////
////	function test() {
////		var x = new SimpleClassTest.Bar();
////		x.fo/*1*/o();
////
////		var y: SimpleInterfaceTest.IBar = null;
////		y.fo/*2*/o();
////
////		var z = new Test.BarBlah();
////		z.fi/*3*/eld = "";
////	}
////}

// References to a field declared in a base class.
goTo.marker("1");
// Work around 668978 - Finding references does not include overrided members in base types.
// Update the expected value from 3 to 2.
verify.referencesCountIs(2);

// References to a field declared in a base interface.
goTo.marker("2");
// Work around 668978 - Finding references does not include overrided members in base types.
// Update the expected value from 3 to 2.
verify.referencesCountIs(2);

// References to a field declared in a chain of base class and interfaces.
goTo.marker("3");
// Work around 668978 - Finding references does not include overrided members in base types.
// Update the expected value from 6 to 2.
verify.referencesCountIs(2);
