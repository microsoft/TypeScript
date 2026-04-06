// @strict: true

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
