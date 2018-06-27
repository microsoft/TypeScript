// ==ORIGINAL==

function /*[#|*/finallyTest/*|]*/(): Promise<void> {
    return fetch("https://typescriptlang.org").then(res => console.log(res)).finally(console.log("finally!"));
}

// ==ASYNC FUNCTION::Convert to async function==

async function finallyTest(): Promise<void> {
    return fetch("https://typescriptlang.org").then(res => console.log(res)).finally(console.log("finally!"));
}
