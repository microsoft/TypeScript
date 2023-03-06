// ==ORIGINAL==

declare function foo(): Promise<number>;
function /*[#|*/f/*|]*/(): Promise<number> {
    return foo().then(x => Promise.resolve(x + 1)).finally(() => console.log("done")).then(y => y + 2);
}
// ==ASYNC FUNCTION::Convert to async function==

declare function foo(): Promise<number>;
async function f(): Promise<number> {
    let y: number;
    try {
        const x = await foo();
        y = await Promise.resolve(x + 1);
    } finally {
        console.log("done");
    }
    return y + 2;
}