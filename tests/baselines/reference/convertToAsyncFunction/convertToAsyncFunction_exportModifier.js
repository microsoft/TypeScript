// ==ORIGINAL==

export function /*[#|*/foo/*|]*/() {
    return fetch('https://typescriptlang.org').then(s => console.log(s));
}

// ==ASYNC FUNCTION::Convert to async function==

export async function foo() {
    const s = await fetch('https://typescriptlang.org');
    return console.log(s);
}
