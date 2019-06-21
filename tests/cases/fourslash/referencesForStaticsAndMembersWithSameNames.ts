/// <reference path='fourslash.ts'/>

////module FindRef4 {
////	module MixedStaticsClassTest {
////		export class Foo {
////			[|[|{| "isDefinition": true, "contextRangeIndex": 0 |}bar|]: Foo;|]
////			[|static [|{| "isDefinition": true, "contextRangeIndex": 2 |}bar|]: Foo;|]
////
////			[|public [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 4 |}foo|](): void {
////			}|]
////			[|public static [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 6 |}foo|](): void {
////			}|]
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

const [fooBarDef, fooBar, fooStaticBarDef, fooStaticBar, fooFooDef, fooFoo, fooStaticFooDef, fooStaticFoo, xFoo, xBar, staticFoo, staticBar] = test.ranges();

// References to a member method with the same name as a static.
verify.singleReferenceGroup("(method) MixedStaticsClassTest.Foo.foo(): void", [fooFoo, xFoo]);

// References to a static method with the same name as a member.
verify.singleReferenceGroup("(method) MixedStaticsClassTest.Foo.foo(): void", [fooStaticFoo, staticFoo]);

// References to a member property with the same name as a static.
verify.singleReferenceGroup("(property) MixedStaticsClassTest.Foo.bar: Foo", [fooBar, xBar]);

// References to a static property with the same name as a member.
verify.singleReferenceGroup("(property) MixedStaticsClassTest.Foo.bar: Foo", [fooStaticBar, staticBar]);
