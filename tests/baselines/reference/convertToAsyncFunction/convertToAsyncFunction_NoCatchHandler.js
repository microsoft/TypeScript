// ==ORIGINAL==

function /*[#|*/f/*|]*/() {
    return fetch('https://typescriptlang.org').then(x => x.statusText).catch(undefined);
}

// ==ASYNC FUNCTION::Convert to async function==

async function f() {
    const x = await fetch('https://typescriptlang.org');
    return x.statusText;
}
