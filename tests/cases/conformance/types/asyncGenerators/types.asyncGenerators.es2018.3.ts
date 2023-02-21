// @target: es2018
// @lib: esnext
// @noEmit: true

async function * AsyncIterableWithAllTypeParams(): AsyncIterableIterator<number, string, boolean> {
    const bool: boolean = yield 3;
    
    return 'abc';
}
