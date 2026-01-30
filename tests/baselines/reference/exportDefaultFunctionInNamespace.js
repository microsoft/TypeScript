//// [tests/cases/compiler/exportDefaultFunctionInNamespace.ts] ////

//// [exportDefaultFunctionInNamespace.ts]
namespace ns_function {
    export default function () {}
}

namespace ns_async_function {
    export default async function () {}
}


//// [exportDefaultFunctionInNamespace.js]
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var ns_function;
(function (ns_function) {
    default function () { }
    ns_function.default_1 = default_1;
})(ns_function || (ns_function = {}));
var ns_async_function;
(function (ns_async_function) {
    default function () {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    ns_async_function.default_2 = default_2;
})(ns_async_function || (ns_async_function = {}));
