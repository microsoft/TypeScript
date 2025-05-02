// @strict: true

// @filename: types.ts
export type SelectorMap<T extends Record<string, (...params: unknown[]) => unknown>> = {
    [key in keyof T]: T[key];
};

// @filename: index.ts
export type SelectorMap<T extends Record<string, (...params: unknown[]) => unknown>> = {
    [key in keyof T]: T[key];
};

export declare const value2: {
    sliceSelectors: <FuncMap extends import('./types').SelectorMap<FuncMap>>(selectorsBySlice: FuncMap) => { [P in keyof FuncMap]: Parameters<FuncMap[P]> };
};

export declare const value3: {
    sliceSelectors: <FuncMap extends SelectorMap<FuncMap>>(selectorsBySlice: FuncMap) => { [P in keyof FuncMap]: Parameters<FuncMap[P]> };
};

