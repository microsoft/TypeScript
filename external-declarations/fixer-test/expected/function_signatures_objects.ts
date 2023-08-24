function foo() {
    return 42;
}
export const a = {
    value: 0,
    array: [1, 2, 3],
    fn(value: string): number { return 0; },
} as const;
const b = {
    value: 0,
    array: [1, 2, 3],
    fn(value: string): number { return 0; },
} as const;
export const c: {
    value: number;
    array: number[];
    fn(value: string): number;
} = {
    value: 0,
    array: [1, 2, 3],
    fn(value: string): number { return 0; },
};
const d = {
    value: 0,
    array: [1, 2, 3],
    fn(value: string): number { return 0; },
};
export const e: {
    readonly value: number;
    readonly array: readonly [1, 2, 3];
    readonly fn: (value: string) => number;
} = {
    value: foo(),
    array: [1, 2, 3],
    fn(value: string): number { return 0; },
} as const;
const f = {
    value: foo(),
    array: [1, 2, 3],
    fn(value: string): number { return 0; },
} as const;
export const g: {
    value: number;
    array: number[];
    fn(value: string): number;
} = {
    value: foo(),
    array: [1, 2, 3],
    fn(value: string): number { return 0; },
};
const h = {
    value: foo(),
    array: [1, 2, 3],
    fn(value: string): number { return 0; },
};
