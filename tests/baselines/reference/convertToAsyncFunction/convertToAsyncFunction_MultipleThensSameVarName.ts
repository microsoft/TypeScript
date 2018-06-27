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
    let result_1 = await fetch('https://typescriptlang.org');
    let result = await res(result_1);
    return res2(result);
}
function res(result){
    return result.ok;
}
function res2(result){
    return result.bodyUsed;
}
