// @noEmit: true

async function foo(x: any) {
    let abc = await Promise.all(x);
    let result: any[] = abc;
    return result;
}