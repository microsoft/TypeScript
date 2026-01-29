//// [tests/cases/compiler/exportDefaultAbstractClass.ts] ////

//// [a.ts]
export default abstract class A { a: number; }

class B extends A {}
new B().a.toExponential();

//// [b.ts]
import A from './a';

class C extends A {}
new C().a.toExponential();

//// [a.js]
export default class A {
}
class B extends A {
}
new B().a.toExponential();
//// [b.js]
import A from './a';
class C extends A {
}
new C().a.toExponential();
