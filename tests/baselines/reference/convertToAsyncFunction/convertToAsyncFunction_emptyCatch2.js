// ==ORIGINAL==

function /*[#|*/f/*|]*/() {
    return Promise.resolve(0).then(x => x).catch();
}

// ==ASYNC FUNCTION::Convert to async function==

async function f() {
    try {
        const x = await Promise.resolve(0);
        return x;
    } catch (e) { }
}
