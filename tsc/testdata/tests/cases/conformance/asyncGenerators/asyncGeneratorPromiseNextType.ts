// @target: esnext
// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/44808

type Result = {message: string}

async function *saverGen(): AsyncGenerator<void, void, Promise<Result> | undefined> {
    let pending: Promise<Result>[] = [];
    while (true) {
        const p: Promise<Result> | undefined = yield;
        if (p != null)
            pending.push(p);
        else {
            const results = await Promise.all(pending);
            pending = [];
            console.log('Storing...');
            await storeResults(results);
        }
    }
}

function storeResults(results: Result[]) {
    console.log(results);
    return Promise.resolve();
}

async function *saverGen2() {
    let pending: Promise<Result>[] = [];
    while (true) {
        const p: Promise<Result> | undefined = yield;
        if (p != null)
            pending.push(p);
        else {
            const results = await Promise.all(pending);
            pending = [];
            console.log('Storing...');
            await storeResults(results);
        }
    }
}
