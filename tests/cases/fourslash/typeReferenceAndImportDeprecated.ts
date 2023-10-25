/// <reference path="fourslash.ts" />

// @filename: types.ts
//// /** @deprecated */
//// export type SelectorMap<T extends Record<string, (...params: unknown[]) => unknown>> = {
////     [key in keyof T]: T[key];
//// };

// @filename: index.ts
//// /** @deprecated */
//// export type SelectorMap<T extends Record<string, (...params: unknown[]) => unknown>> = {
////     [key in keyof T]: T[key];
//// };
//// 
//// export declare const value2: {
////     sliceSelectors: <FuncMap extends [|import('./types').SelectorMap<FuncMap>|]>(selectorsBySlice: FuncMap) => { [P in keyof FuncMap]: Parameters<FuncMap[P]> };
//// };
//// 
//// export declare const value3: {
////     sliceSelectors: <FuncMap extends [|SelectorMap<FuncMap>|]>(selectorsBySlice: FuncMap) => { [P in keyof FuncMap]: Parameters<FuncMap[P]> };
//// };

goTo.file("index.ts");
const ranges = test.ranges();
verify.getSuggestionDiagnostics([
    {
        "code": 6385,
        "message": "'SelectorMap' is deprecated.",
        "reportsDeprecated": true,
        "range": ranges[0]
    },
    {
        "code": 6385,
        "message": "'SelectorMap' is deprecated.",
        "reportsDeprecated": true,
        "range": ranges[1]
    },
]);
