// @target: es2015
// @declaration: true
// @module: commonjs

// @filename: node_modules/test-pkg/index.d.ts
declare const lostSymbol: unique symbol;
type lostSymbol = typeof lostSymbol;

type SomeGeneric<T> = {
    [lostSymbol]: T;
};

declare function fn(): SomeGeneric<unknown>;

export {
    lostSymbol,
    fn
};

// @filename: index.ts
import { fn } from 'test-pkg';
export const value = fn();
