// ==ORIGINAL==

function /*[#|*/f/*|]*/() {
    return Promise.resolve().then(x => 1).catch(x => "a").then(x => !!x);
}

// ==ASYNC FUNCTION::Convert to async function==

async function f() {
    let x_2: string | number;
    try {
        const x = await Promise.resolve();
        x_2 = 1;
    } catch (x_1) {
        x_2 = "a";
    }
    return !!x_2;
}
