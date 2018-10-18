// @declaration: true
export class X {
    constructor(readonly a: number) { }
}

export function y() {
    return class extends X { }
}