// @noImplicitAny: true
// @noImplicitThis: true
// @target: es5
interface Foo {
    n: number;
    x: number;
}

const explicit = {
    n: 12,
    get x(this: Foo): number { return this.n; },
    set x(this: Foo, n: number) { this.n = n; }
}
const copiedFromGetter = {
    n: 14,
    get x(this: Foo): number { return this.n; },
    set x(n) { this.n = n; }
}
const copiedFromSetter = {
    n: 15,
    get x() { return this.n },
    set x(this: Foo, n: number) { this.n = n; }
}
const copiedFromGetterUnannotated = {
    n: 16,
    get x(this: Foo) { return this.n },
    set x(this, n) { this.n = n; }
}

class Explicit {
    n = 17;
    get x(this: Foo): number { return this.n; }
    set x(this: Foo, n: number) { this.n = n; }
}
class Contextual {
    n = 21;
    get x() { return this.n } // inside a class, so already correct
}
