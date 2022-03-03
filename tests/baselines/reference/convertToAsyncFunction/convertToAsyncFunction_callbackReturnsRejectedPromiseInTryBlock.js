// ==ORIGINAL==

function /*[#|*/f/*|]*/() {
    return Promise.resolve(1)
        .then(x => Promise.reject(x))
        .catch(err => console.log(err));
}

// ==ASYNC FUNCTION::Convert to async function==

async function f() {
    try {
        const x = await Promise.resolve(1);
        return await Promise.reject(x);
    } catch (err) {
        return console.log(err);
    }
}
