// @target: es2015

class A1 { }
interface A2 extends A1 { }
declare const a: A2;

class C { #something: number }
const c: C = a;
