// @module: esnext
// @target: esnext

// @Filename: sharedSymbol.ts
export const sharedSymbol: unique symbol = Symbol();

// @Filename: AbstractClassWithTypeImports.ts
import type { sharedSymbol } from "./sharedSymbol.js";

export abstract class AbstractClassTypeImport {
    public abstract [sharedSymbol]: string;
}

// @Filename: AbstractClassNormalImports.ts
import { sharedSymbol } from "./sharedSymbol.js";

export abstract class AbstractClassNormalImport {
    public abstract [sharedSymbol]: string;
}