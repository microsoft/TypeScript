//// [tests/cases/conformance/async/es6/await_unaryExpression_es6_2.ts] ////

//// [await_unaryExpression_es6_2.ts]
async function bar1() {
    delete await 42;
}

async function bar2() {
    delete await 42;
}

async function bar3() {
    void await 42;
}

//// [await_unaryExpression_es6_2.js]
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function bar1() {
    return __awaiter(this, void 0, void 0, function* () {
        delete (yield 42);
    });
}
function bar2() {
    return __awaiter(this, void 0, void 0, function* () {
        delete (yield 42);
    });
}
function bar3() {
    return __awaiter(this, void 0, void 0, function* () {
        void (yield 42);
    });
}
