// ==ORIGINAL==

function /*[#|*/innerPromise/*|]*/(): Promise<string> {
    return fetch("https://typescriptlang.org").then(resp => {
        return resp.blob().then(({ blob }: { blob: { byteOffset: number } }) => [0, blob.byteOffset]).catch(({ message }: Error) => ['Error ', message]);
    }).then(([x, y]) => {
        return (x || y).toString();
    });
}

// ==ASYNC FUNCTION::Convert to async function==

async function innerPromise(): Promise<string> {
    const resp = await fetch("https://typescriptlang.org");
    let result: any[];
    try {
        const { blob } = await resp.blob();
        result = [0, blob.byteOffset];
    } catch ({ message }) {
        result = ['Error ', message];
    }
    const [x, y] = result;
    return (x || y).toString();
}
