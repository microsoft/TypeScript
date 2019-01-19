// ==ORIGINAL==

function /*[#|*/f/*|]*/(): Promise<void> {
    let x = fetch("https://microsoft.com").then(res => console.log("Microsoft:", res));
    if (x.ok) {
        return fetch("https://typescriptlang.org").then(res => console.log(res));
    }
    return x.then(resp => {
        var blob = resp.blob().then(blob => blob.byteOffset).catch(err => 'Error');
        return fetch("https://microsoft.com").then(res => console.log("Another one!"));
    });
}

// ==ASYNC FUNCTION::Convert to async function==

async function f(): Promise<void> {
    let x = fetch("https://microsoft.com").then(res => console.log("Microsoft:", res));
    if (x.ok) {
        const res_1 = await fetch("https://typescriptlang.org");
        return console.log(res_1);
    }
    const resp = await x;
    var blob = resp.blob().then(blob_1 => blob_1.byteOffset).catch(err => 'Error');
    const res_2 = await fetch("https://microsoft.com");
    return console.log("Another one!");
}
