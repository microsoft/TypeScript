// ==ORIGINAL==

declare function foo(): Promise<number>;
function /*[#|*/f/*|]*/(): Promise<number> {
    return foo().then();
}
// ==ASYNC FUNCTION::Convert to async function==

declare function foo(): Promise<number>;
async function f(): Promise<number> {
    return foo();
}