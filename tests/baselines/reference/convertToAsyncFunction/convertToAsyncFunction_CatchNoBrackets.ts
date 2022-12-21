// ==ORIGINAL==

function /*[#|*/f/*|]*/():Promise<void> {
    return fetch('https://typescriptlang.org').then(result => console.log(result)).catch(err => console.log(err));
}
// ==ASYNC FUNCTION::Convert to async function==

async function f():Promise<void> {
    try {
        const result = await fetch('https://typescriptlang.org');
        return console.log(result);
    } catch (err) {
        return console.log(err);
    }
}