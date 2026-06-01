// @noEmit: true
// @captureSuggestions: true

// Regression test for https://github.com/microsoft/TypeScript/issues/62396
// Deprecation message should show the method name, not the type signature

interface Builder {
    configure(value: string): Builder;
    /** @deprecated use {@link Builder} instead */
    oldMethod(): void;
}

declare function createBuilder(): Builder;

// When calling a deprecated method on the result of another call (chained call),
// the deprecation message should show the method name, not the type signature.
createBuilder().configure("x").oldMethod();
