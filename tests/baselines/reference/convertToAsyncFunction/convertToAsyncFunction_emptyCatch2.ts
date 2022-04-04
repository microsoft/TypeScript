// ==ORIGINAL==

function /*[#|*/f/*|]*/() {
    return Promise.resolve(0).then(x => x).catch();
}

// ==ASYNC FUNCTION::Convert to async function==

async function f() {
    const x = await Promise.resolve(0);
    return x;
}
