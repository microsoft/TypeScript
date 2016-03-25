// @noImplicitThis: true

function f1(x) {
    // implicit any is still allowed
    return x + 1;
}

function f2(y: number) {
    // ok: no reference to this
    return y + 1;
}

function f3(z: number): number {
    // error: this is implicitly any
    return this.a + z;
}

// ok, arrow functions don't even bind `this`, so `this` is just `window`
let f4: (b: number) => number = b => this.c + b;
