// @target: esnext
// @noEmit: true

// https://github.com/microsoft/TypeScript/pull/41094#issuecomment-716044363
{
    let a: 0 | 1 = 0;
    const [{ [(a = 1)]: b } = [9, a] as const] = [];
    const bb: 0 = b;
}
{
    let a: 0 | 1 = 1;
    const [{ [a]: b } = [9, a = 0] as const] = [];
    const bb: 9 = b;
}
{
    let a: 0 | 1 = 0;
    const [{ [(a = 1)]: b } = [9, a] as const] = [[9, 8] as const];
    const bb: 0 | 8 = b;
}
{
    let a: 0 | 1 = 1;
    const [{ [a]: b } = [a = 0, 9] as const] = [[8, 9] as const];
    const bb: 0 | 8 = b;
}