// @target: es2017
// @lib: esnext

// @filename: assignment.ts
let x;
x = @dec 1;
x = @@a 1;

// @filename: forAwait.ts
async function f(y: any) {
    for await (@d of y) {}
}

// @filename: destructuring.ts
({...@d} = {});
