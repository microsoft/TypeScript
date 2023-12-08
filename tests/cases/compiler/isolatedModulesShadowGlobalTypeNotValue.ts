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

// @filename: ./bad.ts
import { Date } from './types';
function foo(a: Date) {
    const b = new Date(a.year, a.month, a.day);
    return b.getTime();
}

// @filename: ./good.ts
import type { Date } from './types';
function foo(a: Date) {
    const b = new Date(a.year, a.month, a.day);
    return b.getTime();
}
