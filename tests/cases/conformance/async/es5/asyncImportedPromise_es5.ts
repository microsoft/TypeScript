// @target: es5
// @lib: es5,es2015.promise
// @module: commonjs
// @filename: task.ts
export class Task<T> extends Promise<T> { }

// @filename: test.ts
import { Task } from "./task";
class Test {
    async example<T>(): Task<T> { return; }
}