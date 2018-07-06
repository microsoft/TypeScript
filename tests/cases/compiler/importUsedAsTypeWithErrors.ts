// @filename: test.ts
export interface T {
    value: string
}

// @filename: main.ts
export const a: import("./test") = null;
