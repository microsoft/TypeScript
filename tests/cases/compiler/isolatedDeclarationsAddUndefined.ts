// @isolatedDeclarations: true
// @declaration: true
// @strict: true
// @filename: file1.ts

type N = 1;
export class Bar {
    c? = [2 as N] as const;
    c3? = 1 as N;
    readonly r = 1;
    f = 2;
}

// @filename: file2.ts

export function foo(p = (ip = 10, v: number): void => {}): void{
}
type T = number
export function foo2(p = (ip = 10 as T, v: number): void => {}): void{}
export class Bar2 {
    readonly r = 1;
    f = 2;
}