// ==ORIGINAL==

function /*[#|*/f/*|]*/() {
    return fetch('https://typescriptlang.org').then(res);
}
function res({ status, trailer }){
    console.log(status);
}

// ==ASYNC FUNCTION::Convert to async function==

async function f() {
    const result = await fetch('https://typescriptlang.org');
    return res(result);
}
function res({ status, trailer }){
    console.log(status);
}
