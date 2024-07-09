// @declaration: true
// @module: commonjs

export class C {
    m(): this is D {
        return this instanceof D;
    }
}

export class D extends C {
}