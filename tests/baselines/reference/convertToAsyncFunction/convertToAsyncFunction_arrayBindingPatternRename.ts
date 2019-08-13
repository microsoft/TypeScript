// ==ORIGINAL==

function /*[#|*/f/*|]*/(): Promise<void>{
    const result = getResult();
    return fetch('https://typescriptlang.org').then(([result]) => { console.log(result) });
}
// ==ASYNC FUNCTION::Convert to async function==

async function f(): Promise<void>{
    const result = getResult();
    const [result_1] = await fetch('https://typescriptlang.org');
    console.log(result_1);
}