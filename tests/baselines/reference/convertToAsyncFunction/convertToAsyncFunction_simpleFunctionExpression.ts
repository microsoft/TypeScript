// ==ORIGINAL==

const /*[#|*/foo/*|]*/ = function () {
    return fetch('https://typescriptlang.org').then(result => { console.log(result) });
}

// ==ASYNC FUNCTION::Convert to async function==

const foo = async function () {
    const result = await fetch('https://typescriptlang.org');
    console.log(result);
}
