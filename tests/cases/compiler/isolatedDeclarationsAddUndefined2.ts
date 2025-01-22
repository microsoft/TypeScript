// @isolatedDeclarations: true
// @declaration: true
// @strict: true

// https://github.com/microsoft/TypeScript/issues/60123

export class Bar {
    constructor(private x?: Array | undefined) {}
}

export class Bar2 {
    constructor(private x?: Array) {}
}

export class Bar3 {
    constructor(private x: Array | undefined) {}
}

export class Bar4 {
    constructor(private x: Array) {}
}

export function test1(x?: Array | undefined): void {}

export function test2(x?: Unresolved | undefined): void {}

export function test3(x?: Unresolved): void {}
