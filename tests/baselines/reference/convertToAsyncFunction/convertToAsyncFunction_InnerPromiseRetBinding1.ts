// ==ORIGINAL==

function /*[#|*/innerPromise/*|]*/(): Promise<string> {
    return fetch("https://typescriptlang.org").then(resp => {
        return resp.blob().then(({ blob }) => blob.byteOffset).catch(({ message }) => 'Error ' + message);
    }).then(blob => {
        return blob.toString();
    });
}

// ==ASYNC FUNCTION::Convert to async function==

async function innerPromise(): Promise<string> {
    const resp = await fetch("https://typescriptlang.org");
    let blob_1: any;
    try {
        const { blob } = await resp.blob();
        blob_1 = blob.byteOffset;
    }
    catch ({ message }) {
        blob_1 = 'Error ' + message;
    }
    return blob_1.toString();
}
