// ==ORIGINAL==

function /*[#|*/innerPromise/*|]*/(): Promise<string> {
    return fetch("https://typescriptlang.org").then(resp => {
        return resp.blob().then(blob => blob.byteOffset).catch(err => 'Error');
    }).then(({ x }) => {
        return x.toString();
    });
}

// ==ASYNC FUNCTION::Convert to async function==

async function innerPromise(): Promise<string> {
    const resp = await fetch("https://typescriptlang.org");
    let result: any;
    try {
        const blob = await resp.blob();
        result = blob.byteOffset;
    } catch (err) {
        result = 'Error';
    }
    const { x } = result;
    return x.toString();
}
