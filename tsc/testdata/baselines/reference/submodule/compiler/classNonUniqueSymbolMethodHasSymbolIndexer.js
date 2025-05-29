//// [tests/cases/compiler/classNonUniqueSymbolMethodHasSymbolIndexer.ts] ////

//// [classNonUniqueSymbolMethodHasSymbolIndexer.ts]
declare const a: symbol;
export class A {
    [a]() { return 1 };
}
declare const e1: A[typeof a]; // no error, `A` has `symbol` index

type Constructor = new (...args: any[]) => {};
declare function Mix<T extends Constructor>(classish: T): T & (new (...args: any[]) => {mixed: true});

export const Mixer = Mix(class {
    [a]() { return 1 };
});


//// [classNonUniqueSymbolMethodHasSymbolIndexer.js]
export class A {
    [a]() { return 1; }
    ;
}
export const Mixer = Mix(class {
    [a]() { return 1; }
    ;
});


//// [classNonUniqueSymbolMethodHasSymbolIndexer.d.ts]
export declare class A {
    [x: symbol]: () => number;
}
export declare const Mixer: {
    new (): {
        [x: symbol]: () => number;
    };
} & (new (...args: any[]) => {
    mixed: true;
});
