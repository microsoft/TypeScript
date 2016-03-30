// @declaration: true
// @module: commonjs

export class C {
    m(): this is D {
        return this instanceof D;
    }
}

class D extends C {
}