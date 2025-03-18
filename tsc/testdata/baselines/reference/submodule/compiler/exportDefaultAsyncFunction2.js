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
export default async () => { return 0; };
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
