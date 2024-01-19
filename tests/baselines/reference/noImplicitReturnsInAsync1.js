//// [tests/cases/compiler/noImplicitReturnsInAsync1.ts] ////

//// [noImplicitReturnsInAsync1.ts]
async function test(isError: boolean = false) {
    if (isError === true) {
        return;
    }
    let x = await Promise.resolve("The test is passed without an error.");
}

//// [noImplicitReturnsInAsync1.js]
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function test() {
    return __awaiter(this, arguments, void 0, function* (isError = false) {
        if (isError === true) {
            return;
        }
        let x = yield Promise.resolve("The test is passed without an error.");
    });
}
