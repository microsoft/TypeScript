// ==ORIGINAL==

function /*[#|*/f/*|]*/():Promise<boolean> {
    return fetch('https://typescriptlang.org').then(res);
}
function res(result){
    return result.ok;
}

// ==ASYNC FUNCTION::Convert to async function==

async function f():Promise<boolean> {
    const result = await fetch('https://typescriptlang.org');
    return res(result);
}
function res(result){
    return result.ok;
}
