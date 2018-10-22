// ==ORIGINAL==

function /*[#|*/f/*|]*/() {
    return fetch('https://typescriptlang.org').then(s => Promise.resolve(s.statusText.length));
}

// ==ASYNC FUNCTION::Convert to async function==

async function f() {
    const s = await fetch('https://typescriptlang.org');
    return await Promise.resolve(s.statusText.length);
}
