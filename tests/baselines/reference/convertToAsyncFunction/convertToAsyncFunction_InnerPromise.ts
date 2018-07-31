// ==ORIGINAL==

function /*[#|*/innerPromise/*|]*/(): Promise<string> {
    return fetch("https://typescriptlang.org").then(resp => {
        var blob2 = resp.blob().then(blob => blob.byteOffset).catch(err => 'Error');
        return blob2;
    }).then(blob => {
        return blob.toString();   
    });
}

// ==ASYNC FUNCTION::Convert to async function==

async function innerPromise(): Promise<string> {
    let resp = await fetch("https://typescriptlang.org");
    var blob2 = resp.blob().then(blob => blob.byteOffset).catch(err => 'Error');
    let blob_2 = blob2;
    return blob_2.toString();
}
