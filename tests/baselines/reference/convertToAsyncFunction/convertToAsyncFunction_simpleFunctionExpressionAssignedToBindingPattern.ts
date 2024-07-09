// ==ORIGINAL==

const { length } = /*[#|*/function/*|]*/ () {
    return fetch('https://typescriptlang.org').then(result => { console.log(result) });
}

// ==ASYNC FUNCTION::Convert to async function==

const { length } = async function () {
    const result = await fetch('https://typescriptlang.org');
    console.log(result);
}
