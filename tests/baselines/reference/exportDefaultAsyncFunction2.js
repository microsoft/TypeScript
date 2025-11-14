//// [tests/cases/compiler/exportDefaultAsyncFunction2.ts] ////

//// [asyncawait.ts]
export function async<T>(...args: any[]): any { }
export function await(...args: any[]): any { }

//// [a.ts]
import { async, await } from 'asyncawait';
export default async(() => await(Promise.resolve(1)));

//// [b.ts]
export default async () => { return 0; };

//// [c.ts]
import { async, await } from 'asyncawait';
export default async<number>();

//// [d.ts]
import { async, await } from 'asyncawait';

export default async;

//// [e.ts]
import { async, await } from 'asyncawait';

export default async

export function foo() { }

//// [asyncawait.js]
export function async(...args) { }
export function await(...args) { }
//// [a.js]
import { async, await } from 'asyncawait';
export default async(() => await(Promise.resolve(1)));
//// [b.js]
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default () => __awaiter(void 0, void 0, void 0, function* () { return 0; });
//// [c.js]
import { async } from 'asyncawait';
export default async();
//// [d.js]
import { async } from 'asyncawait';
export default async;
//// [e.js]
import { async } from 'asyncawait';
export default async;
export function foo() { }
