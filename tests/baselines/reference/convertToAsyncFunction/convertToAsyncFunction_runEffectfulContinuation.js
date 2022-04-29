// ==ORIGINAL==

function /*[#|*/f/*|]*/() {
    return fetch('https://typescriptlang.org').then(res).then(_ => console.log("done"));
}
function res(result) {
    return Promise.resolve().then(x => console.log(result));
}

// ==ASYNC FUNCTION::Convert to async function==

async function f() {
    const result = await fetch('https://typescriptlang.org');
    const _ = await res(result);
    return console.log("done");
}
function res(result) {
    return Promise.resolve().then(x => console.log(result));
}
