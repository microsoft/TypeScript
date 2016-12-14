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
const __awaiter = (this && this.__awaiter) || ((thisArg, _arguments, P, generator) => {
    return new (P || (P = Promise))((resolve, reject) => {
        const fulfilled = value => { try { step(generator.next(value)); } catch (e) { reject(e); } }
        const rejected = value => { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        const step = result => { result.done ? resolve(result.value) : new P(resolve => { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
});
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
