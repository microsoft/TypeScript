// @Filename: /dir/a.ts
export const x = 0;

// @Filename: /dir/b.ts
export {};

declare module "./a" {
    export const x = 0;
}

declare module "../dir/a" {
    export const x = 0;
}
