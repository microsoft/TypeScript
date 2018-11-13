// ==ORIGINAL==

function /*[#|*/f/*|]*/(): Promise<void> {
    let x = fetch("https://microsoft.com").then(res => console.log("Microsoft:", res));
    if (x.ok) {
        return fetch("https://typescriptlang.org").then(res => console.log(res));
    }
    return x.then(resp => {
        var blob = resp.blob().then(blob => blob.byteOffset).catch(err => 'Error');
    });
}

// ==ASYNC FUNCTION::Convert to async function==

async function f(): Promise<void> {
    let x = fetch("https://microsoft.com").then(res => console.log("Microsoft:", res));
    if (x.ok) {
        let res_2 = await fetch("https://typescriptlang.org");
        return console.log(res_2);
    }
    let resp = await x;
    var blob = resp.blob().then(blob_1 => blob_1.byteOffset).catch(err => 'Error');
}
