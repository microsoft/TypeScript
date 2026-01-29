//// [tests/cases/compiler/isolatedDeclarationsAddUndefined.ts] ////

//// [file1.ts]
type N = 1;
export class Bar {
    c? = [2 as N] as const;
    c3? = 1 as N;
    readonly r = 1;
    f = 2;
}

//// [file2.ts]
export function foo(p = (ip = 10, v: number): void => {}): void{
}
type T = number
export function foo2(p = (ip = 10 as T, v: number): void => {}): void{}
export class Bar2 {
    readonly r = 1;
    f = 2;
}

//// [file1.js]
export class Bar {
    constructor() {
        this.c = [2];
        this.c3 = 1;
        this.r = 1;
        this.f = 2;
    }
}
//// [file2.js]
export function foo(p = (ip = 10, v) => { }) {
}
export function foo2(p = (ip = 10, v) => { }) { }
export class Bar2 {
    constructor() {
        this.r = 1;
        this.f = 2;
    }
}


//// [file1.d.ts]
type N = 1;
export declare class Bar {
    c?: readonly [1] | undefined;
    c3?: N;
    readonly r = 1;
    f: number;
}
export {};
