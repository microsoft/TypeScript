// ==ORIGINAL==

function /*[#|*/f/*|]*/(): Promise<void> {
    return fetch('https://typescriptlang.org').then( _ => { console.log("done"); });
}
// ==ASYNC FUNCTION::Convert to async function==

async function f(): Promise<void> {
    const _ = await fetch('https://typescriptlang.org');
    console.log("done");
}