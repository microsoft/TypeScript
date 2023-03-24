//// [functionsWithImplicitReturnTypeAssignableToUndefined.ts]
function f1(): unknown {
    if (Math.random() < 0.5) return true;

    // Implicit return, but undefined is always assignable to unknown.
}

function f2(): any {
    // Implicit return, but undefined is always assignable to any.
}

function f3(): void {
    // Implicit return, but undefined is always assignable to void.
}

function f4(): {} {
    if (Math.random() < 0.5) return {};

    // Implicit return, but undefined is assignable to object when strictNullChecks is off.
}

function f5(): Record<string, any> {
    if (Math.random() < 0.5) return { "foo": true };

    // Implicit return, but undefined is assignable to records (which are just fancy objects)
    // when strictNullChecks is off.
}

function f6(): null {
    if (Math.random() < 0.5) return null;

    // Implicit return, but undefined is assignable to null when strictNullChecks is off.
}

function f7(): string | null {
    if (Math.random() < 0.5) return "foo";

    // Implicit return, but undefined is assignable to null when strictNullChecks is off.
}


//// [functionsWithImplicitReturnTypeAssignableToUndefined.js]
function f1() {
    if (Math.random() < 0.5)
        return true;
    // Implicit return, but undefined is always assignable to unknown.
}
function f2() {
    // Implicit return, but undefined is always assignable to any.
}
function f3() {
    // Implicit return, but undefined is always assignable to void.
}
function f4() {
    if (Math.random() < 0.5)
        return {};
    // Implicit return, but undefined is assignable to object when strictNullChecks is off.
}
function f5() {
    if (Math.random() < 0.5)
        return { "foo": true };
    // Implicit return, but undefined is assignable to records (which are just fancy objects)
    // when strictNullChecks is off.
}
function f6() {
    if (Math.random() < 0.5)
        return null;
    // Implicit return, but undefined is assignable to null when strictNullChecks is off.
}
function f7() {
    if (Math.random() < 0.5)
        return "foo";
    // Implicit return, but undefined is assignable to null when strictNullChecks is off.
}
