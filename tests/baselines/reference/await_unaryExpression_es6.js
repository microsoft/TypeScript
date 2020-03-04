//// [await_unaryExpression_es6.ts]
async function bar() {
    !await 42; // OK
}

async function bar1() {
    +await 42; // OK
}

async function bar3() {
    -await 42; // OK
}

async function bar4() {
    ~await 42; // OK
}

//// [await_unaryExpression_es6.js]
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function bar() {
    return __awaiter(this, void 0, void 0, function* () {
        !(yield 42); // OK
    });
}
function bar1() {
    return __awaiter(this, void 0, void 0, function* () {
        +(yield 42); // OK
    });
}
function bar3() {
    return __awaiter(this, void 0, void 0, function* () {
        -(yield 42); // OK
    });
}
function bar4() {
    return __awaiter(this, void 0, void 0, function* () {
        ~(yield 42); // OK
    });
}
