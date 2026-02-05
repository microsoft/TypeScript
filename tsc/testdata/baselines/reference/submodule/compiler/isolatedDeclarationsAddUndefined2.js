//// [tests/cases/compiler/isolatedDeclarationsAddUndefined2.ts] ////

//// [isolatedDeclarationsAddUndefined2.ts]
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


//// [isolatedDeclarationsAddUndefined2.js]
// https://github.com/microsoft/TypeScript/issues/60123
export class Bar {
    x;
    constructor(x) {
        this.x = x;
    }
}
export class Bar2 {
    x;
    constructor(x) {
        this.x = x;
    }
}
export class Bar3 {
    x;
    constructor(x) {
        this.x = x;
    }
}
export class Bar4 {
    x;
    constructor(x) {
        this.x = x;
    }
}
export function test1(x) { }
export function test2(x) { }
export function test3(x) { }


//// [isolatedDeclarationsAddUndefined2.d.ts]
export declare class Bar {
    private x?;
    constructor(x?: Array | undefined);
}
export declare class Bar2 {
    private x?;
    constructor(x?: Array);
}
export declare class Bar3 {
    private x;
    constructor(x: Array | undefined);
}
export declare class Bar4 {
    private x;
    constructor(x: Array);
}
export declare function test1(x?: Array | undefined): void;
export declare function test2(x?: Unresolved | undefined): void;
export declare function test3(x?: Unresolved): void;
