//// [tests/cases/compiler/returnTypeWithGenericAsyncFunction.ts] ////

//// [index.ts]
type MockFactoryWithHelper<M = unknown> = (
  importOriginal: <T extends M = M>() => Promise<T>
) => Partial<Record<keyof M, any>>;
type PromiseMockFactoryWithHelper<M = unknown> = (
  importOriginal: <T extends M = M>() => Promise<T>
) => Promise<Partial<Record<keyof M, any>>>;

const util: {
  mock<T>(module: Promise<T>, factory?: MockFactoryWithHelper<T>): void;
  mock<T>(module: Promise<T>, factory?: PromiseMockFactoryWithHelper<T>): void;
} = {
  mock: (() => {}) as any,
};

util.mock(import("pkg"), async (importOriginal) => ({
  ...(await importOriginal()),
}));

//// [import.d.ts]
export interface ImportInterface {}
//// [require.d.ts]
export interface RequireInterface {}
//// [package.json]
{
  "name": "pkg",
  "version": "0.0.1",
  "exports": {
      "import": "./import.js",
      "require": "./require.js"
  }
}


//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util = {
    mock: (() => { }),
};
util.mock(import("pkg"), async (importOriginal) => ({
    ...(await importOriginal()),
}));
