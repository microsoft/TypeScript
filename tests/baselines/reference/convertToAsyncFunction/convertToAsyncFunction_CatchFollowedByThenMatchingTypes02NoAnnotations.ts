// ==ORIGINAL==

function /*[#|*/f/*|]*/(){
    return fetch("https://typescriptlang.org").then(res => 0).catch(rej => 1).then(res);
}

function res(result){
    return 5;
}

// ==ASYNC FUNCTION::Convert to async function==

async function f(){
    let result: number;
    try {
        const res = await fetch("https://typescriptlang.org");
        result = 0;
    } catch (rej) {
        result = 1;
    }
    return res(result);
}

function res(result){
    return 5;
}
