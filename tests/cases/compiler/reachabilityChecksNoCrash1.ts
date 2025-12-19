// @strict: true
// @target: esnext

export async function arrayFromAsync<T>(asyncIterable!: AsyncIterable<T>): Promise<T[]> {
    const out = [];
    for await (const v of asyncIterable) {
        out.push(await v);
    }
    return out;
}
