// @noImplicitReturns: false
// @strictNullChecks: true

function f1(): unknown {
    if (Math.random() < 0.5) return true;

    // Implicit return, but undefined is assignable to unknown.
}

function f2(): any {
    // Implicit return, but undefined is assignable to any.
}

function f3(): void {
    // Implicit return, but undefined is assignable to void.
}