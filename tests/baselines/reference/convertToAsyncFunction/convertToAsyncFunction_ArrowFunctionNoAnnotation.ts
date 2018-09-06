// ==ORIGINAL==

/*[#|*/() => {/*|]*/
    return fetch('https://typescriptlang.org').then(result => console.log(result));
}
// ==ASYNC FUNCTION::Convert to async function==

async () => {
    const result = await fetch('https://typescriptlang.org');
    return console.log(result);
}