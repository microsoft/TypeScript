// ==ORIGINAL==

function /*[#|*/f/*|]*/(){
    return fetch("https://typescriptlang.org").then(res).catch(rej).then(res);
}

function res(result){
    return result;
}

function rej(reject){
    return reject;
}

// ==ASYNC FUNCTION::Convert to async function==

async function f(){
    let result;
    try {
        result = await fetch("https://typescriptlang.org");
        result = await res(result);
    }
    catch (reject) {
        const result = await rej(reject);
    }
    return res(result);
}

function res(result){
    return result;
}

function rej(reject){
    return reject;
}
