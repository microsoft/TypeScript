// ==ORIGINAL==

function /*[#|*/f/*|]*/() {
    return fetch('https://typescriptlang.org').then(s => Promise.resolve(s.statusText).then(st => st.length)).then(x => console.log(x + 5));
}

// ==ASYNC FUNCTION::Convert to async function==

async function f() {
    const s = await fetch('https://typescriptlang.org');
    const st = await Promise.resolve(s.statusText);
    const x = st.length;
    return console.log(x + 5);
}
