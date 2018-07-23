// ==ORIGINAL==

function /*[#|*/f/*|]*/(): Promise<string> {
    var blob = fetch("https://typescriptlang.org").then(resp => {
        var blob = resp.blob().then(blob => blob.byteOffset).catch(err => 'Error');
    }).then(blob => {
        return blob.toString();
    });

    return blob;
}

// ==ASYNC FUNCTION::Convert to async function==

async function f(): Promise<string> {
    let resp = await fetch("https://typescriptlang.org");
    let blob_3;
    try {
        let blob_2 = await resp.blob();
        blob_3 = blob_2.byteOffset;
    }
    catch (err) {
        blob_3 = 'Error';
    }
    let blob = blob_3.toString();

    return blob;
}
