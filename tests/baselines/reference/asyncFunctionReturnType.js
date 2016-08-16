//// [asyncFunctionReturnType.ts]
async function fAsync() {
    // Without explicit type annotation, this is just an array.
    return [1, true];
}

async function fAsyncExplicit(): Promise<[number, boolean]> {
    // This is contextually typed as a tuple.
    return [1, true];
}


//// [asyncFunctionReturnType.js]
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
function fAsync() {
    return __awaiter(this, void 0, void 0, function* () {
        // Without explicit type annotation, this is just an array.
        return [1, true];
    });
}
function fAsyncExplicit() {
    return __awaiter(this, void 0, void 0, function* () {
        // This is contextually typed as a tuple.
        return [1, true];
    });
}
