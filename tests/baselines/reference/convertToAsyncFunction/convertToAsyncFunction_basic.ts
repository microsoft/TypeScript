// ==ORIGINAL==

function /*[#|*/f/*|]*/(): Promise<void>{
    return fetch('https://typescriptlang.org').then(result => { console.log(result) });
}
// ==ASYNC FUNCTION::Convert to async function==

async function f(): Promise<void>{
    const result = await fetch('https://typescriptlang.org');
    console.log(result);
}