export type T1 = () => void;
export type T2 = (a: number, b: number) => number;

export function f1() { } satisfies () => void;
export function f2() { } satisfies () => number;
export function f3() { } satisfies T1;

export function f4(a: number, b: number) {
    return 1;
} satisfies (a: number, b: number) => number;

export function f5(a: number, b: number) {
    return 1;
} satisfies T2;

export function f6(a: boolean, b: boolean) {
    return 1;
} satisfies (a: number, b: number) => number;

export function f7(a: number, b: boolean) {
    return 1;
} satisfies T2;

export function f8(a: number, b: number) {
    return "";
} satisfies (a: number, b: number) => number;

export function f9(a: number, b: number) {
    return "";
} satisfies T2;
