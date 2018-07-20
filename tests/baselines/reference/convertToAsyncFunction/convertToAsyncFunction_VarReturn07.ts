// ==ORIGINAL==

function /*[#|*/f/*|]*/() {
    let blob = fetch("https://typescriptlang.org");
    let blob2 = fetch("https://microsoft.com");
    blob2.then(res => console.log("res:", res));
    blob.then(resp => console.log(resp));
    return blob;
}

// ==ASYNC FUNCTION::Convert to async function==

async function f() {
    let resp = await fetch("https://typescriptlang.org");
    let blob = console.log(resp);
    let res = await fetch("https://microsoft.com");
    console.log("res:", res);
    return blob;
}
