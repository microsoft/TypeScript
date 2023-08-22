function foo() {
    return { x: 1, y: 1 } as const;
}
const dest = foo();
export const x: 1 = dest.x;
const temp = dest.y;
export const y: 1 | 0 = temp === undefined ? 0 : dest.y;
export const z = 42;
