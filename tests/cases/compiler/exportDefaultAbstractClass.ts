// @Filename: a.ts
export default abstract class A { a: number; }

class B extends A {}
new B().a.toExponential();

// @Filename: b.ts
import A from './a';

class C extends A {}
new C().a.toExponential();