// ==ORIGINAL==

declare function foo(): Promise<number>;
function /*[#|*/f/*|]*/(): Promise<number> {
    return foo().then(x => x + 1).finally(() => console.log("done"));
}
// ==ASYNC FUNCTION::Convert to async function==

declare function foo(): Promise<number>;
async function f(): Promise<number> {
    try {
        const x = await foo();
        return x + 1;
    } finally {
        return console.log("done");
    }
}