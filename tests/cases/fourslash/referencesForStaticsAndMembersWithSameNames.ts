/// <reference path='fourslash.ts'/>

////module FindRef4 {
////	module MixedStaticsClassTest {
////		export class Foo {
////			/*1*/bar: Foo;
////			/*2*/static /*3*/bar: Foo;
////
////			/*4*/public /*5*/foo(): void {
////			}
////			/*6*/public static /*7*/foo(): void {
////			}
////		}
////	}
////
////	function test() {
////		// instance function
////		var x = new MixedStaticsClassTest.Foo();
////		x./*8*/foo();
////		x./*9*/bar;
////
////		// static function
////		MixedStaticsClassTest.Foo./*10*/foo();
////		MixedStaticsClassTest.Foo./*11*/bar;
////	}
////}

// References to a member method with the same name as a static.
// References to a static method with the same name as a member.
// References to a member property with the same name as a static.
// References to a static property with the same name as a member.
verify.baselineFindAllReferences('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11');
