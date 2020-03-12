// ==ORIGINAL==

function /*[#|*/f/*|]*/() {
    const result = 'https://typescriptlang.org';
    return fetch(result).then(res);
}
function res({ status, trailer }){
    console.log(status);
}

// ==ASYNC FUNCTION::Convert to async function==

async function f() {
    const result = 'https://typescriptlang.org';
    const result_1 = await fetch(result);
    return res(result_1);
}
function res({ status, trailer }){
    console.log(status);
}
