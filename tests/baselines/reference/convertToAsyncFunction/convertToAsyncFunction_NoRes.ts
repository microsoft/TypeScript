// ==ORIGINAL==

function /*[#|*/f/*|]*/():Promise<void | Response> {
    return fetch('https://typescriptlang.org').then(null, rejection => console.log("rejected:", rejection));
}

// ==ASYNC FUNCTION::Convert to async function==

async function f():Promise<void | Response> {
    try {
        return await fetch('https://typescriptlang.org');
    } catch (rejection) {
        return console.log("rejected:", rejection);
    }
}
