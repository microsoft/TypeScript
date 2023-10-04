export const a = {
    value: 0,
    array: [1, 2, 3],
} as const;

const b = {
    value: 0,
    array: [1, 2, 3],
} as const;

export const c: {
    value: number;
    array: number[];
} = {
    value: 0,
    array: [1, 2, 3],
};

const d = {
    value: 0,
    array: [1, 2, 3],
};
