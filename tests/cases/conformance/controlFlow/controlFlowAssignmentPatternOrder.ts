// @target: esnext
// @noEmit: true

// https://github.com/microsoft/TypeScript/pull/41094#issuecomment-716044363
declare function f(): void;
{
    let a: 0 | 1 = 0;
    let b: 0 | 1 | 9;
    [{ [(a = 1)]: b } = [9, a] as const] = [];
    const bb: 0 = b;
}
{
    let a: 0 | 1 = 1;
    let b: 0 | 1 | 9;
    [{ [a]: b } = [9, a = 0] as const] = [];
    const bb: 9 = b;
}
{
    let a: 0 | 1 = 0;
    let b: 0 | 1 | 8 | 9;
    [{ [(a = 1)]: b } = [9, a] as const] = [[9, 8] as const];
    const bb: 0 | 8 = b;
}
{
    let a: 0 | 1 = 1;
    let b: 0 | 1 | 8 | 9;
    [{ [a]: b } = [a = 0, 9] as const] = [[8, 9] as const];
    const bb: 0 | 8 = b;
}
// same as above but on left of a binary expression
{
    let a: 0 | 1 = 0;
    let b: 0 | 1 | 9;
    [{ [(a = 1)]: b } = [9, a] as const] = [], f();
    const bb: 0 = b;
}
{
    let a: 0 | 1 = 1;
    let b: 0 | 1 | 9;
    [{ [a]: b } = [9, a = 0] as const] = [], f();
    const bb: 9 = b;
}
{
    let a: 0 | 1 = 0;
    let b: 0 | 1 | 8 | 9;
    [{ [(a = 1)]: b } = [9, a] as const] = [[9, 8] as const], f();
    const bb: 0 | 8 = b;
}
{
    let a: 0 | 1 = 1;
    let b: 0 | 1 | 8 | 9;
    [{ [a]: b } = [a = 0, 9] as const] = [[8, 9] as const], f();
    const bb: 0 | 8 = b;
}
// same as above but on right of a binary expression
{
    let a: 0 | 1 = 0;
    let b: 0 | 1 | 9;
    f(), [{ [(a = 1)]: b } = [9, a] as const] = [];
    const bb: 0 = b;
}
{
    let a: 0 | 1 = 1;
    let b: 0 | 1 | 9;
    f(), [{ [a]: b } = [9, a = 0] as const] = [];
    const bb: 9 = b;
}
{
    let a: 0 | 1 = 0;
    let b: 0 | 1 | 8 | 9;
    f(), [{ [(a = 1)]: b } = [9, a] as const] = [[9, 8] as const];
    const bb: 0 | 8 = b;
}
{
    let a: 0 | 1 = 1;
    let b: 0 | 1 | 8 | 9;
    f(), [{ [a]: b } = [a = 0, 9] as const] = [[8, 9] as const];
    const bb: 0 | 8 = b;
}