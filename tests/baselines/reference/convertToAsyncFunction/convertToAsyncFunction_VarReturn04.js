// ==ORIGINAL==

function /*[#|*/f/*|]*/() {
    var blob = fetch("https://typescriptlang.org").then(res => console.log(res)), blob2 = fetch("https://microsoft.com").then(res => res.ok).catch(err);
    return blob;
}
function err (rej) {
    console.log(rej)
}

// ==ASYNC FUNCTION::Convert to async function==

async function f() {
    let res = await fetch("https://typescriptlang.org");
    var blob = console.log(res);
    try {
        let res_1 = await fetch("https://microsoft.com");
        res_1.ok;
    }
    catch (rej) {
        return err(rej);
    }
    return blob;
}
function err (rej) {
    console.log(rej)
}
