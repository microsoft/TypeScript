// ==ORIGINAL==

function /*[#|*/f/*|]*/():Promise<void> {
    return fetch('https://typescriptlang.org').then(result => { console.log(result); }, rejection => { console.log("rejected:", rejection); });
}

// ==ASYNC FUNCTION::Convert to async function==

async function f():Promise<void> {
    try {
        const result = await fetch('https://typescriptlang.org');
        console.log(result);
    }
    catch (rejection) {
        console.log("rejected:", rejection);
    }
}
