//// [tests/cases/compiler/asyncIIFE.ts] ////

//// [asyncIIFE.ts]
function f1() {
    (async () => {
        await 10
        throw new Error();
    })();

    var x = 1;
}


//// [asyncIIFE.js]
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function f1() {
    (() => __awaiter(this, void 0, void 0, function* () {
        yield 10;
        throw new Error();
    }))();
    var x = 1;
}
