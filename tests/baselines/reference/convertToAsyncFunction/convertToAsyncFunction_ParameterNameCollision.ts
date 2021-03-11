// ==ORIGINAL==

async function foo<T>(x: T): Promise<T> {
    return x;
}

function /*[#|*/bar/*|]*/<T>(x: T): Promise<T> {
    return foo(x).then(foo)
}

// ==ASYNC FUNCTION::Convert to async function==

async function foo<T>(x: T): Promise<T> {
    return x;
}

async function bar<T>(x: T): Promise<T> {
    const x_1 = await foo(x);
    return foo(x_1);
}
