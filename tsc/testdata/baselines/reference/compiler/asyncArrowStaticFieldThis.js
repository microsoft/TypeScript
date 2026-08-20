//// [tests/cases/compiler/asyncArrowStaticFieldThis.ts] ////

//// [asyncArrowStaticFieldThis.ts]
namespace NS {
    export class C {
        static h = async () => 1;
        static i = async () => this.h;
    }
}


//// [asyncArrowStaticFieldThis.js]
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var NS;
(function (NS) {
    var _a;
    class C {
    }
    _a = C;
    C.h = () => __awaiter(void 0, void 0, void 0, function* () { return 1; });
    C.i = () => __awaiter(void 0, void 0, void 0, function* () { return _a.h; });
    NS.C = C;
})(NS || (NS = {}));
