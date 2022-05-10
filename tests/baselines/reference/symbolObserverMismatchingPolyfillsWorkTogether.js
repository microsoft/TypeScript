//// [symbolObserverMismatchingPolyfillsWorkTogether.ts]
interface SymbolConstructor {
    readonly observer: symbol;
}
interface SymbolConstructor {
    readonly observer: unique symbol;
}

const obj = {
    [Symbol.observer]: 0
};

//// [symbolObserverMismatchingPolyfillsWorkTogether.js]
const obj = {
    [Symbol.observer]: 0
};


//// [symbolObserverMismatchingPolyfillsWorkTogether.d.ts]
interface SymbolConstructor {
    readonly observer: symbol;
}
interface SymbolConstructor {
    readonly observer: unique symbol;
}
declare const obj: {
    [Symbol.observer]: number;
};
