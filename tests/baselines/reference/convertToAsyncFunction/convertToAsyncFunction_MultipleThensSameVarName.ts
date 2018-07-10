// ==ORIGINAL==

function /*[#|*/f/*|]*/():Promise<boolean> {
    return fetch('https://typescriptlang.org').then(res).then(res2);
}
function res(result){
    return result.ok;
}
function res2(result){
    return result.bodyUsed;
}

// ==ASYNC FUNCTION::Convert to async function==

async function f():Promise<boolean> {
    let result = await fetch('https://typescriptlang.org');
    let result_1 = await res(result);
    return res2(result_1);
}
function res(result){
    return result.ok;
}
function res2(result){
    return result.bodyUsed;
}
