// @strict: true
// @noEmit: true
// @checkOrder: default, typesfirst, editorfirst

// Narrowing this by a type guard in a method relates the class to a
// derived class, whose members include the method being inferred. The
// relation only observes the method's return type in progress, so the
// method is not circular, whether the class or its methods are typed first
// (55069).

declare function isDerived(p: Base): p is Derived;
class Base {
    private add() {
        if (isDerived(this)) {
            if (this.name) return 1;
        }
        const w = this.add2();
        return w;
    }
    private add2() { return 2; }
}
class Derived extends Base { name = ""; }
