// @strict: true
// @noEmit: true

function factory<T extends object>(ctor: new () => T) {
    class Base extends ctor {}
    class Derived extends Base {}
    return Derived;
}

class A { a = 1; }
class B { b = "b"; }

const DA = factory(A);
const a = new DA();
const aValue: number = a.a;
const aAll = { ...a };

const DB = factory(B);
const b = new DB();
const bValue: string = b.b;
const bAll = { ...b };
