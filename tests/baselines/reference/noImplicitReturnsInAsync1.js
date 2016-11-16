//// [noImplicitReturnsInAsync1.ts]

async function test(isError: boolean = false) {
    if (isError === true) {
        return;
    }
    let x = await Promise.resolve("The test is passed without an error.");
}

//// [noImplicitReturnsInAsync1.js]
const __awaiter = (this && this.__awaiter) || ((thisArg, _arguments, P, generator) => {
    return new (P || (P = Promise))((resolve, reject) => {
        const fulfilled = value => { try { step(generator.next(value)); } catch (e) { reject(e); } }
        const rejected = value => { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        const step = result => { result.done ? resolve(result.value) : new P(resolve => { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
});
function test(isError = false) {
    return __awaiter(this, void 0, void 0, function* () {
        if (isError === true) {
            return;
        }
        let x = yield Promise.resolve("The test is passed without an error.");
    });
}
