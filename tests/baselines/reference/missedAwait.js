//// [missedAwait.ts]
async function isAsync() {
    return 10;
}

class SomeClass {
    async foo() {
        return "ok";
    }
}

var x = new SomeClass();
function notAsync() {
    isAsync(); // OK
    x.foo(); // OK
}

async function alsoAsync() {
    isAsync(); // No
    x.foo(); // No
    void isAsync(); // OK
    void x.foo(); // OK

    var j = x.foo(); // OK
    j = x.foo(); // OK
    await isAsync(); // OK
    await x.foo(); // OK
}

//// [missedAwait.js]
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function isAsync() {
    return __awaiter(this, void 0, void 0, function* () {
        return 10;
    });
}
class SomeClass {
    foo() {
        return __awaiter(this, void 0, void 0, function* () {
            return "ok";
        });
    }
}
var x = new SomeClass();
function notAsync() {
    isAsync(); // OK
    x.foo(); // OK
}
function alsoAsync() {
    return __awaiter(this, void 0, void 0, function* () {
        isAsync(); // No
        x.foo(); // No
        void isAsync(); // OK
        void x.foo(); // OK
        var j = x.foo(); // OK
        j = x.foo(); // OK
        yield isAsync(); // OK
        yield x.foo(); // OK
    });
}
