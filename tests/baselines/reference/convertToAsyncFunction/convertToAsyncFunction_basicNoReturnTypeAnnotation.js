// ==ORIGINAL==

function /*[#|*/f/*|]*/() {
    return fetch('https://typescriptlang.org').then(result => { console.log(result) });
}
// ==ASYNC FUNCTION::Convert to async function==

async function f() {
    const result = await fetch('https://typescriptlang.org');
    console.log(result);
}