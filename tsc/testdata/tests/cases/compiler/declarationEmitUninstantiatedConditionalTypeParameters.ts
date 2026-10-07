// @declaration: true
// @emitDeclarationOnly: true
// @strictNullChecks: true
// @noImplicitAny: false
// @module: commonjs
// @noImplicitReferences: true

// @filename: contracts.js
exports.schema = { parse: v => v };

// @filename: router.ts
import { State } from "./contracts";
interface Builder<TOutputOut> {
    query<T>(resolver: () => T): { output: TOutputOut extends "unset" ? T : TOutputOut };
}

declare const builder: Builder<"unset">;

export const query = builder.query((): State | null => null);
export const anyQuery = builder.query((): any => null);
export const typedQuery = builder.query((): string | null => null);
