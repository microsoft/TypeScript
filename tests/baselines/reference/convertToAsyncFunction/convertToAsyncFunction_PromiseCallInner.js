// ==ORIGINAL==

function /*[#|*/f/*|]*/() {
    return fetch(Promise.resolve(1).then(res => "https://typescriptlang.org")).catch(err => console.log(err));
}


// ==ASYNC FUNCTION::Convert to async function==

async function f() {
    try {
        return await fetch(Promise.resolve(1).then(res => "https://typescriptlang.org"));
    } catch (err) {
        return console.log(err);
    }
}

