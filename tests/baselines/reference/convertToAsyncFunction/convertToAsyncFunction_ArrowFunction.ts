// ==ORIGINAL==

/*[#|*/():Promise<void> => {/*|]*/
    return fetch('https://typescriptlang.org').then(result => console.log(result));
}
// ==ASYNC FUNCTION::Convert to async function==

async ():Promise<void> => {
    const result = await fetch('https://typescriptlang.org');
    return console.log(result);
}