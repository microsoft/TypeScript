// ==ORIGINAL==

function /*[#|*/f/*|]*/() {
    let x = fetch("https://typescriptlang.org").then(res => console.log(res));
    return x.catch(err => console.log("Error!", err));
}


// ==ASYNC FUNCTION::Convert to async function==

async function f() {
    let x = fetch("https://typescriptlang.org").then(res => console.log(res));
    try {
        return await x;
    } catch (err) {
        return console.log("Error!", err);
    }
}

