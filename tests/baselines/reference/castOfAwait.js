//// [tests/cases/compiler/castOfAwait.ts] ////

//// [castOfAwait.ts]
async function f() {
    <number> await 0;
    typeof await 0;
    void await 0;
    await void <string> typeof <number> void await 0;
    await await 0;
}


//// [castOfAwait.js]
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function f() {
    return __awaiter(this, void 0, void 0, function* () {
        yield 0;
        typeof (yield 0);
        void (yield 0);
        yield void typeof void (yield 0);
        yield yield 0;
    });
}
