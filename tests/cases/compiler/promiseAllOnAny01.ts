// @noEmit: true
// @lib: es5,es2015.promise

async function foo(x: any) {
    let abc = await Promise.all(x);
    let result: any[] = abc;
    return result;
}