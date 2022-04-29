// ==ORIGINAL==

function /*[#|*/f/*|]*/() {
    return fetch('https://typescriptlang.org').then(s => Promise.resolve(s.statusText.length)).then(x => console.log(x + 5));
}

// ==ASYNC FUNCTION::Convert to async function==

async function f() {
    const s = await fetch('https://typescriptlang.org');
    const x = await Promise.resolve(s.statusText.length);
    return console.log(x + 5);
}
