// ==ORIGINAL==

function /*[#|*/f/*|]*/():Promise<void> {
    return fetch('https://typescriptlang.org').then(res, rej);
}
function res(result){
    console.log(result);
}
function rej(err){
    console.log(err);
}

// ==ASYNC FUNCTION::Convert to async function==

async function f():Promise<void> {
    try {
        const result = await fetch('https://typescriptlang.org');
        return res(result);
    }
    catch (err) {
        return rej(err);
    }
}
function res(result){
    console.log(result);
}
function rej(err){
    console.log(err);
}
