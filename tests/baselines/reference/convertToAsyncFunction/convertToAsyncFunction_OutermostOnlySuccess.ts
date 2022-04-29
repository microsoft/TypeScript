// ==ORIGINAL==

function /*[#|*/foo/*|]*/() {
    return fetch('a').then(() => {
        return fetch('b').then(() => 'c');
    })
}

// ==ASYNC FUNCTION::Convert to async function==

async function foo() {
    await fetch('a');
    await fetch('b');
    return 'c';
}
