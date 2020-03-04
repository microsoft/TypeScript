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
    const resp = await fetch("https://typescriptlang.org");
    var blob2 = resp.blob().then(blob => blob.byteOffset).catch(err => 'Error');
    const blob_1 = await blob2;
    return blob_1.toString();
}
