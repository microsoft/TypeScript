//// [awaitContextAndStaticMembers3.ts]
async function wrapper (v: Promise<number>) {
    return class C {
        static staticField1 = await (v);
        static staticField2 = await (v) + C.staticField1;
    }
}


//// [awaitContextAndStaticMembers3.js]
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function wrapper(v) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        return _a = class C {
            },
            _a.staticField1 = yield (v),
            _a.staticField2 = (yield (v)) + _a.staticField1,
            _a;
    });
}
