// ==ORIGINAL==

const res = (result) => {
    return result.ok;
}
function /*[#|*/f/*|]*/(): Promise<boolean> {
    return fetch('https://typescriptlang.org').then(res);
}
        
// ==ASYNC FUNCTION::Convert to async function==

const res = (result) => {
    return result.ok;
}
async function f(): Promise<boolean> {
    const result = await fetch('https://typescriptlang.org');
    return res(result);
}
        