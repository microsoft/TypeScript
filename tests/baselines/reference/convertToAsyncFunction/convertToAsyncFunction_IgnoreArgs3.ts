// ==ORIGINAL==

function /*[#|*/f/*|]*/(): Promise<void> {
    return fetch('https://typescriptlang.org').then( () => console.log("almost done") ).then( () => console.log("done") );
}
// ==ASYNC FUNCTION::Convert to async function==

async function f(): Promise<void> {
    await fetch('https://typescriptlang.org');
    console.log("almost done");
    return console.log("done");
}