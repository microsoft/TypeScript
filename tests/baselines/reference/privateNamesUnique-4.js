//// [privateNamesUnique-4.ts]
class A1 { }
interface A2 extends A1 { }
declare const a: A2;

class C { #something: number }
const c: C = a;


//// [privateNamesUnique-4.js]
var _C_something;
class A1 {
}
class C {
    constructor() {
        _C_something.set(this, void 0);
    }
}
_C_something = new WeakMap();
const c = a;
