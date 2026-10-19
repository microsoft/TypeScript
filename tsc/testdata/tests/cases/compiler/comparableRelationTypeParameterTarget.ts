// @noEmit: true
// @strict: true

// Reproduces #27910: a generic constructor type must be comparable with a concrete
// constructor it could overlap with. Previously, `Constructor<T> === typeof Child`
// reported TS2367 ("no overlap") even though `func(Child)` accepted `Child` as
// `Constructor<T>`.

interface Item { }

abstract class Base<T> {
    get Item(): T { throw 0 }
}

class Child extends Base<Item> {
    constructor(public data: any) { super() }
}

type Constructor<T> = new (data: any) => Base<T>

function func<T>(constructor: Constructor<T>): void {
    if (constructor === Child) {
        // do something
    }
    new constructor(null)
}

func(Child);

// Two unrelated type parameters still have no overlap.
function unrelated<T, U>(x: T, y: U): void {
    if (x === y) {
    }
}
