/// <reference path='fourslash.ts'/>

////module FindRef4 {
////	module MixedStaticsClassTest {
////		export class Foo {
////			[|bar|]: Foo;
////			static [|bar|]: Foo;
////
////			public [|foo|](): void {
////			}
////			public static [|foo|](): void {
////			}
////		}
////	}
////
////	function test() {
////		// instance function
////		var x = new MixedStaticsClassTest.Foo();
////		x.[|foo|]();
////		x.[|bar|];
////
////		// static function
////		MixedStaticsClassTest.Foo.[|foo|]();
////		MixedStaticsClassTest.Foo.[|bar|];
////	}
////}

const [fooBar, fooStaticBar, fooFoo, fooStaticFoo, xFoo, xBar, staticFoo, staticBar] = test.ranges();

// References to a member method with the same name as a static.
verify.referencesOf(fooFoo, [fooFoo, xFoo]);

// References to a static method with the same name as a member.
verify.referencesOf(fooStaticFoo, [fooStaticFoo, staticFoo]);

// References to a member property with the same name as a static.
verify.referencesOf(fooBar, [fooBar, xBar]);

// References to a static property with the same name as a member.
verify.referencesOf(fooStaticBar, [fooStaticBar, staticBar]);
