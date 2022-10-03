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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
class Task extends Promise {
}
exports.Task = Task;
//// [test.js]
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class Test {
    example() {
        return __awaiter(this, void 0, void 0, function* () { return; });
    }
}
