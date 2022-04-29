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
    const resp = await fetch("https://typescriptlang.org");
    const blob = await resp.blob();
    const blob_1 = blob.byteOffset;
    return blob_1.toString();
}
