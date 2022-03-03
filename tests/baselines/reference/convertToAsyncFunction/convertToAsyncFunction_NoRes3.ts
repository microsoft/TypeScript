// ==ORIGINAL==

function /*[#|*/f/*|]*/():Promise<void | Response> {
    return fetch('https://typescriptlang.org').catch(rej => console.log(rej));
}

// ==ASYNC FUNCTION::Convert to async function==

async function f():Promise<void | Response> {
    try {
        return await fetch('https://typescriptlang.org');
    } catch (rej) {
        return console.log(rej);
    }
}
