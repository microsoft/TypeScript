// @isolatedModules: false, true
// @verbatimModuleSyntax: false, true
// @noEmit: true
// @noTypesAndSymbols: true

// @filename: ./types.ts
export interface Date {
    day: number;
    month: number;
    year: number;
}

export namespace Event {
    export type T = any;
}

// @filename: ./bad.ts
import { Date, Event } from './types';
function foo(a: Date) {
    const b = new Date(a.year, a.month, a.day);
    return b.getTime();
}
function bar() {
    return new Event('bar') as Event.T;
}

// @filename: ./good.ts
import type { Date, Event } from './types';
function foo(a: Date) {
    const b = new Date(a.year, a.month, a.day);
    return b.getTime();
}
function bar() {
    return new Event('bar') as Event.T;
}
