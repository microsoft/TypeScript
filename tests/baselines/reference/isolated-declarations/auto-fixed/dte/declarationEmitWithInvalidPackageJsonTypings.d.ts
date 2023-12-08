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
export declare const useCsvParser: () => invalid;
//# sourceMappingURL=index.d.ts.map
/// [Errors] ////

/p1/index.ts(7,29): error TS9507: Function must have an explicit type annotation with with --isolatedDeclarations


==== /p1/node_modules/csv-parse/lib/index.d.ts (0 errors) ====
    export function bar(): number;
==== /p1/node_modules/csv-parse/package.json (0 errors) ====
    {
      "main": "./lib",
      "name": "csv-parse",
      "types": [
        "./lib/index.d.ts",
        "./lib/sync.d.ts"
      ],
      "version": "4.8.2"
    }
==== /p1/index.ts (1 errors) ====
    export interface MutableRefObject<T> {
        current: T;
    }
    export function useRef<T>(current: T): MutableRefObject<T> {
        return { current };
    }
    export const useCsvParser = () => {
                                ~~~~~~~
!!! error TS9507: Function must have an explicit type annotation with with --isolatedDeclarations
!!! related TS9600 /p1/index.ts:7:14: Add a type annotation to the variable useCsvParser
!!! related TS9603 /p1/index.ts:7:29: Add a return type to the function expression
        const parserRef = useRef<typeof import("csv-parse")>(null);
        return parserRef;
    };
    