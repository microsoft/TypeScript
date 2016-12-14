//// [asyncIIFE.ts]

function f1() {
    (async () => {
        await 10
        throw new Error();
    })();

    var x = 1;
}


//// [asyncIIFE.js]
const __awaiter = (this && this.__awaiter) || ((thisArg, _arguments, P, generator) => {
    return new (P || (P = Promise))((resolve, reject) => {
        const fulfilled = value => { try { step(generator.next(value)); } catch (e) { reject(e); } }
        const rejected = value => { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        const step = result => { result.done ? resolve(result.value) : new P(resolve => { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
});
function f1() {
    (() => __awaiter(this, void 0, void 0, function* () {
        yield 10;
        throw new Error();
    }))();
    var x = 1;
}
