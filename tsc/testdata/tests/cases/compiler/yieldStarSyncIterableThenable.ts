// @target: esnext
// @strict: true

// https://github.com/microsoft/TypeScript/issues/65452

declare const thenable: { then(onfulfilled: number): void };

async function* delegated() {
    yield* [thenable];
}

async function* direct() {
    yield thenable;
}

async function iterated() {
    for await (const value of [thenable]) {
        value;
    }
}

async function* valid() {
    yield* [1];
    yield* [Promise.resolve(1)];
}
