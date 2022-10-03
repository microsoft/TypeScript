// ==ORIGINAL==

function /*[#|*/f/*|]*/() {
    return Promise.resolve().then(() => ({ x: 3 })).catch(() => ({ x: "a" })).then(({ x }) => !!x);
}

// ==ASYNC FUNCTION::Convert to async function==

async function f() {
    let result;
    try {
        await Promise.resolve();
        result = ({ x: 3 });
    } catch {
        result = ({ x: "a" });
    }
    const { x } = result;
    return !!x;
}
