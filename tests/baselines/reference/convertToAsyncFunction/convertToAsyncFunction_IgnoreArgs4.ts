// ==ORIGINAL==

function /*[#|*/f/*|]*/() {
    return fetch('https://typescriptlang.org').then(res);
}
function res(){
    console.log("done");
}
// ==ASYNC FUNCTION::Convert to async function==

async function f() {
    const result = await fetch('https://typescriptlang.org');
    return res(result);
}
function res(){
    console.log("done");
}