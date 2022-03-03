// ==ORIGINAL==

function foo(props: any): void {
    return props;
}

const fn = (): Promise<(message: string) => void> =>
    new Promise(resolve => resolve((message: string) => foo(message)));

function /*[#|*/f/*|]*/() {
    return fn().then(res => res("test"));
}

// ==ASYNC FUNCTION::Convert to async function==

function foo(props: any): void {
    return props;
}

const fn = (): Promise<(message: string) => void> =>
    new Promise(resolve => resolve((message: string) => foo(message)));

async function f() {
    const res = await fn();
    return res("test");
}
