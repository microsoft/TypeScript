//// [tests/cases/conformance/async/es6/await_unaryExpression_es6_3.ts] ////

//// [await_unaryExpression_es6_3.ts]
async function bar1() {
    ++await 42; // Error
}

async function bar2() {
    --await 42; // Error
}

async function bar3() {
    var x = 42;
    await x++; // OK but shouldn't need parenthesis
}

async function bar4() {
    var x = 42;
    await x--; // OK but shouldn't need parenthesis
}

//// [await_unaryExpression_es6_3.js]
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
        ++;
        yield 42; // Error
    });
}
function bar2() {
    return __awaiter(this, void 0, void 0, function* () {
        --;
        yield 42; // Error
    });
}
function bar3() {
    return __awaiter(this, void 0, void 0, function* () {
        var x = 42;
        yield x++; // OK but shouldn't need parenthesis
    });
}
function bar4() {
    return __awaiter(this, void 0, void 0, function* () {
        var x = 42;
        yield x--; // OK but shouldn't need parenthesis
    });
}
