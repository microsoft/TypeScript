// @noImplicitReturns: false
// @strictNullChecks: false

function f1(): {} {
    if (Math.random() < 0.5) return {};

    // Implicit return, but undefined is assignable to object.
}

function f2(): Record<string, any> {
    if (Math.random() < 0.5) return { "foo": true };

    // Implicit return, but undefined is assignable to records (which are just fancy objects).
}

function f3(): null {
    if (Math.random() < 0.5) return null;

    // Implicit return, but undefined is assignable to null.
}

function f4(): string | null {
    if (Math.random() < 0.5) return "string";

    // Implicit return, but undefined is assignable to null.
}
