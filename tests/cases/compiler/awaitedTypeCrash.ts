// @target: esnext

// https://github.com/microsoft/TypeScript/issues/51984
async function* f<T extends Promise<never>>(): AsyncGenerator<T, void, void> { }