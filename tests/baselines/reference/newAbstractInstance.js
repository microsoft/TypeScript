//// [tests/cases/compiler/newAbstractInstance.ts] ////

//// [newAbstractInstance.ts]
abstract class B { }
declare const b: B;
new b();


//// [newAbstractInstance.js]
class B {
}
new b();
