//// [tests/cases/compiler/spuriousCircularityOnTypeImport.ts] ////

//// [types.ts]
export type SelectorMap<T extends Record<string, (...params: unknown[]) => unknown>> = {
    [key in keyof T]: T[key];
};

//// [index.ts]
export type SelectorMap<T extends Record<string, (...params: unknown[]) => unknown>> = {
    [key in keyof T]: T[key];
};

export declare const value2: {
    sliceSelectors: <FuncMap extends import('./types').SelectorMap<FuncMap>>(selectorsBySlice: FuncMap) => { [P in keyof FuncMap]: Parameters<FuncMap[P]> };
};

export declare const value3: {
    sliceSelectors: <FuncMap extends SelectorMap<FuncMap>>(selectorsBySlice: FuncMap) => { [P in keyof FuncMap]: Parameters<FuncMap[P]> };
};



//// [types.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
