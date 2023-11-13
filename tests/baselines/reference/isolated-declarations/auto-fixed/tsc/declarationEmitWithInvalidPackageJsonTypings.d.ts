//// [tests/cases/compiler/declarationEmitWithInvalidPackageJsonTypings.ts] ////

//// [/p1/node_modules/csv-parse/lib/index.d.ts]
export function bar(): number;
//// [/p1/node_modules/csv-parse/package.json]
{
  "main": "./lib",
  "name": "csv-parse",
  "types": [
    "./lib/index.d.ts",
    "./lib/sync.d.ts"
  ],
  "version": "4.8.2"
}
//// [/p1/index.ts]
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


/// [Declarations] ////



//// [/p1/index.d.ts]
export interface MutableRefObject<T> {
    current: T;
}
export declare function useRef<T>(current: T): MutableRefObject<T>;
export declare const useCsvParser: () => MutableRefObject<typeof import("csv-parse")>;
//# sourceMappingURL=index.d.ts.map