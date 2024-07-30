/// <reference lib="es2015.symbol" />
/// <reference lib="decorators" />

interface SymbolConstructor {
    readonly metadata: unique symbol;
}

interface Function {
    [Symbol.metadata]: DecoratorMetadata | null;
}
