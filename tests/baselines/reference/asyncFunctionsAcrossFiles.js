//// [tests/cases/compiler/asyncFunctionsAcrossFiles.ts] ////

//// [a.ts]
import { b } from './b';
export const a = {
    f: async () => {
        await b.f();
    }
};
//// [b.ts]
import { a } from './a';
export const b = {
    f: async () => {
        await a.f();
    }
};

//// [b.js]
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, Promise, generator) {
    return new Promise(function (resolve, reject) {
        generator = generator.call(thisArg, _arguments);
        function cast(value) { return value instanceof Promise && value.constructor === Promise ? value : new Promise(function (resolve) { resolve(value); }); }
        function onfulfill(value) { try { step("next", value); } catch (e) { reject(e); } }
        function onreject(value) { try { step("throw", value); } catch (e) { reject(e); } }
        function step(verb, value) {
            var result = generator[verb](value);
            result.done ? resolve(result.value) : cast(result.value).then(onfulfill, onreject);
        }
        step("next", void 0);
    });
};
import { a } from './a';
export const b = {
    f: () => __awaiter(this, void 0, Promise, function* () {
        yield a.f();
    })
};
//// [a.js]
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, Promise, generator) {
    return new Promise(function (resolve, reject) {
        generator = generator.call(thisArg, _arguments);
        function cast(value) { return value instanceof Promise && value.constructor === Promise ? value : new Promise(function (resolve) { resolve(value); }); }
        function onfulfill(value) { try { step("next", value); } catch (e) { reject(e); } }
        function onreject(value) { try { step("throw", value); } catch (e) { reject(e); } }
        function step(verb, value) {
            var result = generator[verb](value);
            result.done ? resolve(result.value) : cast(result.value).then(onfulfill, onreject);
        }
        step("next", void 0);
    });
};
import { b } from './b';
export const a = {
    f: () => __awaiter(this, void 0, Promise, function* () {
        yield b.f();
    })
};
