// ==ORIGINAL==

function /*[#|*/f/*|]*/():Promise<void> {
    return fetch('https://typescriptlang.org').then(result => console.log(result), rejection => console.log("rejected:", rejection));
}

// ==ASYNC FUNCTION::Convert to async function==

async function f():Promise<void> {
    let result: Response;
    try {
        result = await fetch('https://typescriptlang.org');
    }
    catch (rejection) {
        return console.log("rejected:", rejection);
    }
    return console.log(result);
}
