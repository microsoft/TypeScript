//// [tests/cases/conformance/async/es6/asyncMultiFile_es6.ts] ////

//// [a.ts]
async function f() {}
//// [b.ts]
function g() { }

//// [a.js]
const __awaiter = (this && this.__awaiter) || ((thisArg, _arguments, P, generator) => {
    return new (P || (P = Promise))((resolve, reject) => {
        const fulfilled = value => { try { step(generator.next(value)); } catch (e) { reject(e); } }
        const rejected = value => { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        const step = result => { result.done ? resolve(result.value) : new P(resolve => { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
});
function f() {
    return __awaiter(this, void 0, void 0, function* () { });
}
//// [b.js]
function g() { }
