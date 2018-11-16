// ==ORIGINAL==

function /*[#|*/f/*|]*/(): Promise<void> {
    return fetch('https://typescriptlang.org').then( () => console.log("done") );
}
// ==ASYNC FUNCTION::Convert to async function==

async function f(): Promise<void> {
    await fetch('https://typescriptlang.org');
    return console.log("done");
}