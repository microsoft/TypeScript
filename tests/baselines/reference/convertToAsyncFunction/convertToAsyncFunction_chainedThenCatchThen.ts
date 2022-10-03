// ==ORIGINAL==

declare function foo(): Promise<number>;
function /*[#|*/f/*|]*/(): Promise<number> {
    return foo().then(x => Promise.resolve(x + 1)).catch(() => 1).then(y => y + 2);
}
// ==ASYNC FUNCTION::Convert to async function==

declare function foo(): Promise<number>;
async function f(): Promise<number> {
    let y: number;
    try {
        const x = await foo();
        y = await Promise.resolve(x + 1);
    } catch {
        y = 1;
    }
    return y + 2;
}