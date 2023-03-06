// ==ORIGINAL==

function /*[#|*/f/*|]*/() {
    return Promise.resolve().catch();
}

// ==ASYNC FUNCTION::Convert to async function==

async function f() {
    return Promise.resolve();
}
