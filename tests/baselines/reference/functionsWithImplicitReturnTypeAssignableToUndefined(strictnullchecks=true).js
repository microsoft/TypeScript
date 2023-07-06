//// [tests/cases/compiler/functionsWithImplicitReturnTypeAssignableToUndefined.ts] ////

//// [functionsWithImplicitReturnTypeAssignableToUndefined.ts]
function f1(): unknown {
    if (Math.random() < 0.5) return true;

    // Implicit return, but undefined is always assignable to unknown.
}

type MyUnknown = unknown;
function f2(): unknown {
    if (Math.random() < 0.5) return true;

    // Implicit return, but undefined is always assignable to unknown.
}

function f3(): any {
    // Implicit return, but undefined is always assignable to any.
}

function f4(): void {
    // Implicit return, but undefined is always assignable to void.
}

function f5(): {} {
    if (Math.random() < 0.5) return {};

    // Implicit return, but undefined is assignable to object when strictNullChecks is off.
}

function f6(): Record<string, any> {
    if (Math.random() < 0.5) return { "foo": true };

    // Implicit return, but undefined is assignable to records (which are just fancy objects)
    // when strictNullChecks is off.
}

function f7(): null {
    if (Math.random() < 0.5) return null;

    // Implicit return, but undefined is assignable to null when strictNullChecks is off.
}

function f8(): string | null {
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
    if (Math.random() < 0.5)
        return true;
    // Implicit return, but undefined is always assignable to unknown.
}
function f3() {
    // Implicit return, but undefined is always assignable to any.
}
function f4() {
    // Implicit return, but undefined is always assignable to void.
}
function f5() {
    if (Math.random() < 0.5)
        return {};
    // Implicit return, but undefined is assignable to object when strictNullChecks is off.
}
function f6() {
    if (Math.random() < 0.5)
        return { "foo": true };
    // Implicit return, but undefined is assignable to records (which are just fancy objects)
    // when strictNullChecks is off.
}
function f7() {
    if (Math.random() < 0.5)
        return null;
    // Implicit return, but undefined is assignable to null when strictNullChecks is off.
}
function f8() {
    if (Math.random() < 0.5)
        return "foo";
    // Implicit return, but undefined is assignable to null when strictNullChecks is off.
}
