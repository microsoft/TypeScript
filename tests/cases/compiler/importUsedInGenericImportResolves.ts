// @filename: test1.d.ts
export interface T<P> {
    a: P;
}

// @filename: test2.d.ts
export declare const theme: { a: string }

// @filename: test3.ts
export const a: import("./test1").T<typeof import("./test2").theme> = null as any;