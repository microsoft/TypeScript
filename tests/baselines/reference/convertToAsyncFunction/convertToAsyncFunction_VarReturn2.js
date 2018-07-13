// ==ORIGINAL==

function /*[#|*/f/*|]*/() {
    let blob = fetch("https://typescriptlang.org");
    blob.then(resp => console.log(resp));
    return blob;
}

// ==ASYNC FUNCTION::Convert to async function==

async function f() {
    let resp = await fetch("https://typescriptlang.org");
    let blob = console.log(resp);
    return blob;
}
