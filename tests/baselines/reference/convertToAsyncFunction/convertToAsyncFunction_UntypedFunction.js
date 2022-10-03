// ==ORIGINAL==

function /*[#|*/f/*|]*/() {
    return Promise.resolve().then(res => console.log(res));
}

// ==ASYNC FUNCTION::Convert to async function==

async function f() {
    const res = await Promise.resolve();
    return console.log(res);
}
