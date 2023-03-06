// ==ORIGINAL==

function /*[#|*/f/*|]*/() {
    return fetch('https://typescriptlang.org').then(undefined, rejection => console.log("rejected:", rejection));
}

// ==ASYNC FUNCTION::Convert to async function==

async function f() {
    try {
        return await fetch('https://typescriptlang.org');
    } catch (rejection) {
        return console.log("rejected:", rejection);
    }
}
