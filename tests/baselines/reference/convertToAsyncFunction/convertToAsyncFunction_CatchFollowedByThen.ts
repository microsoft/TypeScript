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
    let result: any;
    try {
        const result_1 = await fetch("https://typescriptlang.org");
        result = await res(result_1);
    } catch (reject) {
        result = await rej(reject);
    }
    return res(result);
}

function res(result){
    return result;
}

function rej(reject){
    return reject;
}
