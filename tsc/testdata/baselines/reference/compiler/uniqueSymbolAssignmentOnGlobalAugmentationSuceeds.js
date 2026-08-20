//// [tests/cases/compiler/uniqueSymbolAssignmentOnGlobalAugmentationSuceeds.ts] ////

//// [uniqueSymbolAssignmentOnGlobalAugmentationSuceeds.ts]
const FOO_SYMBOL = Symbol('Foo');

declare global {
    interface Promise<T> {
        [FOO_SYMBOL]?: number;
    }
}

export function foo<T>(p: Promise<T>) {
    p[FOO_SYMBOL] = 3;
}

//// [uniqueSymbolAssignmentOnGlobalAugmentationSuceeds.js]
const FOO_SYMBOL = Symbol('Foo');
export function foo(p) {
    p[FOO_SYMBOL] = 3;
}
