// ==ORIGINAL==

function /*[#|*/f/*|]*/() {
    return fetch('https://typescriptlang.org').then(res);
}
function res(){
    console.log("done");
}
// ==ASYNC FUNCTION::Convert to async function==

async function f() {
    const result_1 = await fetch('https://typescriptlang.org');
    return res(result_1);
}
function res(){
    console.log("done");
}