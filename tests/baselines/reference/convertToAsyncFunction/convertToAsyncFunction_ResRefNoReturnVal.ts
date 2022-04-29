// ==ORIGINAL==

function /*[#|*/f/*|]*/():Promise<void> {
    return fetch('https://typescriptlang.org').then(res);
}
function res(result){
    console.log(result);
}

// ==ASYNC FUNCTION::Convert to async function==

async function f():Promise<void> {
    const result = await fetch('https://typescriptlang.org');
    return res(result);
}
function res(result){
    console.log(result);
}
