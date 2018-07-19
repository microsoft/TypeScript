// ==ORIGINAL==

function /*[#|*/f/*|]*/() {
    let blob3;
    let blob = fetch("https://typescriptlang.org");
    let blob2 = fetch("https://microsoft.com");
    blob2.then(res => console.log("res:", res));
    blob.then(resp => console.log(resp));
    blob3 = fetch("test.com");
    blob3 = blob2;
    return blob;
}

// ==ASYNC FUNCTION::Convert to async function==

async function f() {
    let blob3;
    let resp = await fetch("https://typescriptlang.org");
    let blob = console.log(resp);
    let res = await fetch("https://microsoft.com");
    let blob2 = console.log("res:", res);
    blob3 = await fetch("test.com");
    blob3 = blob2;
    return blob;
}
