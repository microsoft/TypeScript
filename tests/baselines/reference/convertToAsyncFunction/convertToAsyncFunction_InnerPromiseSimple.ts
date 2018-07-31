// ==ORIGINAL==

function /*[#|*/f/*|]*/(): Promise<string> {
    return fetch("https://typescriptlang.org").then(resp => {
        return resp.blob().then(blob => blob.byteOffset);
    }).then(blob => {
        return blob.toString();
    });
}

// ==ASYNC FUNCTION::Convert to async function==

async function f(): Promise<string> {
    let resp = await fetch("https://typescriptlang.org");
    let blob = await resp.blob();
    let blob_2 = blob.byteOffset;
    return blob_2.toString();
}
