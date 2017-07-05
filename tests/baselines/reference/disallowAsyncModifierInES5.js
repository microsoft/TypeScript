//// [disallowAsyncModifierInES5.ts]

async function foo() { return 42; } // ERROR: Async functions are only available in ES6+
let bar = async function () { return 42; } // OK, but should be an error
let baz = async () => 42; // OK, but should be an error

//// [disallowAsyncModifierInES5.js]
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
function foo() {
    return __awaiter(this, void 0, void 0, function* () { return 42; });
} // ERROR: Async functions are only available in ES6+
var bar = function () {
    return __awaiter(this, void 0, void 0, function* () { return 42; });
}; // OK, but should be an error
var baz = function () __awaiter(this, void 0, void 0, function* () { return 42; }); // OK, but should be an error
