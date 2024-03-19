//// [tests/cases/compiler/declarationEmitWithInvalidPackageJsonTypings.ts] ////

//// [index.d.ts]
export function bar(): number;
//// [package.json]
{
  "main": "./lib",
  "name": "csv-parse",
  "types": [
    "./lib/index.d.ts",
    "./lib/sync.d.ts"
  ],
  "version": "4.8.2"
}
//// [index.ts]
export interface MutableRefObject<T> {
    current: T;
}
export function useRef<T>(current: T): MutableRefObject<T> {
    return { current };
}
export const useCsvParser = () => {
    const parserRef = useRef<typeof import("csv-parse")>(null);
    return parserRef;
};


//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCsvParser = void 0;
exports.useRef = useRef;
function useRef(current) {
    return { current: current };
}
var useCsvParser = function () {
    var parserRef = useRef(null);
    return parserRef;
};
exports.useCsvParser = useCsvParser;


//// [index.d.ts]
export interface MutableRefObject<T> {
    current: T;
}
export declare function useRef<T>(current: T): MutableRefObject<T>;
export declare const useCsvParser: () => MutableRefObject<typeof import("csv-parse")>;
