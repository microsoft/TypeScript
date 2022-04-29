// @target: es6

// @filename: asyncawait.ts
export function async<T>(...args: any[]): any { }
export function await(...args: any[]): any { }

// @filename: a.ts
import { async, await } from 'asyncawait';
export default async(() => await(Promise.resolve(1)));

// @filename: b.ts
export default async () => { return 0; };

// @filename: c.ts
import { async, await } from 'asyncawait';
export default async<number>();

// @filename: d.ts
import { async, await } from 'asyncawait';

export default async;

// @filename: e.ts
import { async, await } from 'asyncawait';

export default async

export function foo() { }