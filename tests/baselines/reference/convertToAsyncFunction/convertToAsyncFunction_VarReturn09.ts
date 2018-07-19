// ==ORIGINAL==

function /*[#|*/f/*|]*/() {
    let blob3;
    let blob = fetch("https://typescriptlang.org");
    let blob2 = fetch("https://microsoft.com");
    blob2.then(res => console.log("res:", res));
    blob.then(resp => console.log(resp));
    blob3 = blob2.catch(rej => rej.ok);
    return blob;
}

// ==ASYNC FUNCTION::Convert to async function==

async function f() {
    let blob3;
    let resp = await fetch("https://typescriptlang.org");
    let blob = console.log(resp);
    try {
        let res = await fetch("https://microsoft.com");
        console.log("res:", res);
    }
    catch (rej) {
        blob3 = rej.ok;
    }
    return blob;
}
