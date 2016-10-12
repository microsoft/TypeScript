//// [tests/cases/conformance/async/es2017/asyncImportedPromise_es2017.ts] ////

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
class Test {
    async example() { return; }
}
