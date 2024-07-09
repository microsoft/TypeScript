// ==ORIGINAL==

class Parser {
    /*[#|*/f/*|]*/():Promise<void> {
        return fetch('https://typescriptlang.org').then(result => console.log(result));
    }
}
// ==ASYNC FUNCTION::Convert to async function==

class Parser {
    async f():Promise<void> {
        const result = await fetch('https://typescriptlang.org');
        return console.log(result);
    }
}