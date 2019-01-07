// ==ORIGINAL==

function foo() {
    return fetch('a').then(/*[#|*/() => {/*|]*/
        return fetch('b').then(() => 'c');
    })
}

// ==ASYNC FUNCTION::Convert to async function==

function foo() {
    return fetch('a').then(async () => {
        await fetch('b');
        return 'c';
    })
}
