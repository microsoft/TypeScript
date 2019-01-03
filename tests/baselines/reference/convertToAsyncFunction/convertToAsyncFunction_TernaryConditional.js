// ==ORIGINAL==

function /*[#|*/f/*|]*/() {
    let i;
    return Promise.resolve().then(res => res ? i = res : i = 100);
}

// ==ASYNC FUNCTION::Convert to async function==

async function f() {
    let i;
    const res = await Promise.resolve();
    return res ? i = res : i = 100;
}
