// ==ORIGINAL==

function /*[#|*/f/*|]*/(): Promise<string> {
    return fetch("https://typescriptlang.org").then(resp => {
        var blob = resp.blob().then(blob => blob.byteOffset).catch(err => 'Error');
    }).then(blob => {
        return blob.toString();
    });
}

// ==ASYNC FUNCTION::Convert to async function==

async function f(): Promise<string> {
    const resp = await fetch("https://typescriptlang.org");
    var blob = resp.blob().then(blob_1 => blob_1.byteOffset).catch(err => 'Error');
    const blob_2 = undefined;
    return blob_2.toString();
}
