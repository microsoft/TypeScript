// ==ORIGINAL==

function /*[#|*/f/*|]*/() {
    return fetch('https://typescriptlang.org').then(x => Promise.resolve(3).then(y => Promise.resolve(x.statusText.length + y)));
}

// ==ASYNC FUNCTION::Convert to async function==

async function f() {
    const x = await fetch('https://typescriptlang.org');
    const y = await Promise.resolve(3);
    return await Promise.resolve(x.statusText.length + y);
}
