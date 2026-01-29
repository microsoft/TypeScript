// @module: commonjs
// @target: es2015
// @declaration: true
export class X {
    constructor(readonly a: number) { }
}

export function y() {
    return class extends X { }
}