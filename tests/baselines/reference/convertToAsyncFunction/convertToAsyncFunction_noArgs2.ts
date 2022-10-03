// ==ORIGINAL==

function delay(millis: number): Promise<void> {
    throw "no"
}

function /*[#|*/main2/*|]*/() {
    console.log("Please wait. Loading.");
    return delay(500)
        .then(() => delay(500))
        .then(() => delay(500))
        .then(() => delay(500))
}
        
// ==ASYNC FUNCTION::Convert to async function==

function delay(millis: number): Promise<void> {
    throw "no"
}

async function main2() {
    console.log("Please wait. Loading.");
    await delay(500);
    await delay(500);
    await delay(500);
    return await delay(500);
}
        