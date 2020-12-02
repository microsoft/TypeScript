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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class AsyncEnumeratorDone {
}
;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const x = null;
        let a = yield x.next1();
        let b = yield x.next2();
        let c = yield x.next3();
        let d = yield x.next4();
    });
}
