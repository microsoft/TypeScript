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
    let result: any;
    try {
        result = await fetch('https://typescriptlang.org');
    }
    catch (err) {
        return rej(err);
    }
    return res(result);
}
function res(result){
    console.log(result);
}
function rej(err){
    console.log(err);
}
