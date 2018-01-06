//// [initializedParameterBeforeNonoptionalNotOptional.ts]
export declare function foo({a}?: {
    a?: string;
}): void;
export declare function foo2({a}: {
    a?: string | undefined;
} | undefined, b: string): void;

//// [initializedParameterBeforeNonoptionalNotOptional.js]
"use strict";
exports.__esModule = true;
