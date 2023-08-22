function foo() {
    return { x: 1, y: 1 } as const;
}
export const { x, y = 0 } = foo(), z = 42;