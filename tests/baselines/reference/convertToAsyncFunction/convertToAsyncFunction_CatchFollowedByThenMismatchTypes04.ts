// ==ORIGINAL==

interface a {
    name: string;
    age: number;
}

interface b extends a {
    color: string;
}


function /*[#|*/f/*|]*/(){
    return fetch("https://typescriptlang.org").then(res).catch(rej).then(res);
}

function res(result): b{
    return {name: "myName", age: 22, color: "red"};
}

function rej(reject): a{
    return {name: "myName", age: 27};
}

// ==ASYNC FUNCTION::Convert to async function==

interface a {
    name: string;
    age: number;
}

interface b extends a {
    color: string;
}


async function f(){
    let result: a;
    try {
        const result_1 = await fetch("https://typescriptlang.org");
        result = await res(result_1);
    } catch (reject) {
        result = await rej(reject);
    }
    return res(result);
}

function res(result): b{
    return {name: "myName", age: 22, color: "red"};
}

function rej(reject): a{
    return {name: "myName", age: 27};
}
