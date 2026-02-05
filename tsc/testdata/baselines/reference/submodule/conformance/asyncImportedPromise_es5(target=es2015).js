//// [tests/cases/conformance/async/es5/asyncImportedPromise_es5.ts] ////

//// [task.ts]
export class Task<T> extends Promise<T> { }

//// [test.ts]
import { Task } from "./task";
class Test {
    async example<T>(): Task<T> { return; }
}

//// [task.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
class Task extends Promise {
}
exports.Task = Task;
//// [test.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Test {
    async example() { return; }
}
