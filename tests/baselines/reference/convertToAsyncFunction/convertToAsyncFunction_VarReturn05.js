// ==ORIGINAL==

function /*[#|*/f/*|]*/() {
    var blob = fetch("https://typescriptlang.org").then(res => console.log(res));
    blob.then(x => x);
    return blob;
}

// ==ASYNC FUNCTION::Convert to async function==

async function f() {
    let res = await fetch("https://typescriptlang.org");
    let x = console.log(res);
    let blob = x;
    return blob;
}
