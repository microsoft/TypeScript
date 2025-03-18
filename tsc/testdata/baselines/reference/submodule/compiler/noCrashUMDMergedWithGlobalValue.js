//// [tests/cases/compiler/noCrashUMDMergedWithGlobalValue.ts] ////

//// [other.d.ts]
export as namespace SomeInterface;
export type Action = "PUSH" | "POP" | "REPLACE";

//// [main.ts]
interface SomeInterface {
  readonly length: number;
}
declare const value: SomeInterface;


//// [main.js]
