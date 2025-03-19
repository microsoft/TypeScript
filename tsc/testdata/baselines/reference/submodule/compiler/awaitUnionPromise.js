//// [tests/cases/compiler/awaitUnionPromise.ts] ////

//// [awaitUnionPromise.ts]
// https://github.com/Microsoft/TypeScript/issues/18186

class AsyncEnumeratorDone { };

interface IAsyncEnumerator<T> {
    next1(): Promise<T | AsyncEnumeratorDone>;
    next2(): Promise<T> | Promise<AsyncEnumeratorDone>;
    next3(): Promise<T | {}>;
    next4(): Promise<T | { x: string }>;
}

async function main() {
    const x: IAsyncEnumerator<number> = null;
    let a = await x.next1();
    let b = await x.next2();
    let c = await x.next3();
    let d = await x.next4();
}


//// [awaitUnionPromise.js]
// https://github.com/Microsoft/TypeScript/issues/18186
class AsyncEnumeratorDone {
}
;
async function main() {
    const x = null;
    let a = await x.next1();
    let b = await x.next2();
    let c = await x.next3();
    let d = await x.next4();
}
