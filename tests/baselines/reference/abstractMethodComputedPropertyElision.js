//// [tests/cases/compiler/abstractMethodComputedPropertyElision.ts] ////

//// [sharedSymbol.ts]
export const sharedSymbol: unique symbol = Symbol();

//// [AbstractClassWithTypeImports.ts]
import type { sharedSymbol } from "./sharedSymbol.js";

export abstract class AbstractClassTypeImport {
    public abstract [sharedSymbol]: string;
}

//// [AbstractClassNormalImports.ts]
import { sharedSymbol } from "./sharedSymbol.js";

export abstract class AbstractClassNormalImport {
    public abstract [sharedSymbol]: string;
}

//// [sharedSymbol.js]
export const sharedSymbol = Symbol();
//// [AbstractClassWithTypeImports.js]
export class AbstractClassTypeImport {
}
//// [AbstractClassNormalImports.js]
export class AbstractClassNormalImport {
}
