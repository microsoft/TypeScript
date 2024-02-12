// @filename: /a.d.ts
declare global {
    export namespace ns {
        export function eval(): void;
        export function arguments(): void;
    }
}
export {}
