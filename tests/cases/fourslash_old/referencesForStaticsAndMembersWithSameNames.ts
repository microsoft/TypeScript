/// <reference path='fourslash.ts'/>

////module FindRef4 {
////	module MixedStaticsClassTest {
////		export class Foo {
////			b/*3*/ar: Foo;
////			static b/*4*/ar: Foo;
////
////			public f/*1*/oo(): void {
////			}
////			public static f/*2*/oo(): void {
////			}
////		}
////	}
////
////	function test() {
////		// instance function
////		var x = new MixedStaticsClassTest.Foo();
////		x.foo();
////		x.bar;
////
////		var y = new MixedStaticsClassTest.Foo();
////		y.foo();
////		y.bar;
////
////		// static function
////		MixedStaticsClassTest.Foo.foo();
////		MixedStaticsClassTest.Foo.bar;
////	}
////}

// this line triggers a semantic/syntactic error check, remove line when 788570 is fixed
edit.insert('');

// References to a member method with the same name as a static.
goTo.marker("1");
verify.referencesCountIs(3);

// References to a static method with the same name as a member.
goTo.marker("2");
verify.referencesCountIs(2);

// References to a member property with the same name as a static.
goTo.marker("3");
verify.referencesCountIs(3);

// References to a static property with the same name as a member.
goTo.marker("4");
verify.referencesCountIs(2);
