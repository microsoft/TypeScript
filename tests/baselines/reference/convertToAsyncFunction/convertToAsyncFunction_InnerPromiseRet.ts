// ==ORIGINAL==

function /*[#|*/innerPromise/*|]*/(): Promise<string> {
    return fetch("https://typescriptlang.org").then(resp => {
        return resp.blob().then(blob => blob.byteOffset).catch(err => 'Error');
    }).then(blob => {
        return blob.toString();   
    });
}

// ==ASYNC FUNCTION::Convert to async function==

async function innerPromise(): Promise<string> {
    let resp = await fetch("https://typescriptlang.org");
    let blob_2;
    try {
        let blob = await resp.blob();
        blob_2 = blob.byteOffset;
    }
    catch (err) {
        blob_2 = 'Error';
    }
    return blob_2.toString();
}
