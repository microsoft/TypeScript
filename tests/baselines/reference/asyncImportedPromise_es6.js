//// [tests/cases/conformance/async/es6/asyncImportedPromise_es6.ts] ////

//// [task.ts]
export class Task<T> extends Promise<T> { }

//// [test.ts]
import { Task } from "./task";
class Test {
    async example<T>(): Task<T> { return; }
}

//// [task.js]
"use strict";
class Task extends Promise {
}
exports.Task = Task;
//// [test.js]
"use strict";
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
var task_1 = require("./task");
class Test {
    example() {
        return __awaiter(this, void 0, task_1.Task, function* () { return; });
    }
}
