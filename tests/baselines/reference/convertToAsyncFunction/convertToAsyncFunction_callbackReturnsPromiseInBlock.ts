// ==ORIGINAL==

function /*[#|*/f/*|]*/() {
    return fetch('https://typescriptlang.org').then(s => { return Promise.resolve(s.statusText.length) }).then(x => x + 5);
}

// ==ASYNC FUNCTION::Convert to async function==

async function f() {
    const s = await fetch('https://typescriptlang.org');
    const x = await Promise.resolve(s.statusText.length);
    return x + 5;
}
