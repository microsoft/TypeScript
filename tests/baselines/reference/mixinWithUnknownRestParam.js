//// [tests/cases/conformance/classes/mixinWithUnknownRestParam.ts] ////

//// [mixinWithUnknownRestParam.ts]
// Repro for https://github.com/microsoft/TypeScript/issues/29707
// unknown[] should be a valid mixin constructor constraint, same as any[]

type ClassConstructor = new (...args: unknown[]) => {}

function mixin<C extends ClassConstructor>(Class: C) {
    return class extends Class {}
}

class Base {
    constructor(public x: number) {}
}

const Mixed = mixin(Base)
const instance = new Mixed(42)


//// [mixinWithUnknownRestParam.js]
"use strict";
// Repro for https://github.com/microsoft/TypeScript/issues/29707
// unknown[] should be a valid mixin constructor constraint, same as any[]
function mixin(Class) {
    return class extends Class {
    };
}
class Base {
    x;
    constructor(x) {
        this.x = x;
    }
}
const Mixed = mixin(Base);
const instance = new Mixed(42);
