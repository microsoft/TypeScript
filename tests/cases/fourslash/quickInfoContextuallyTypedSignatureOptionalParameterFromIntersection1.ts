/// <reference path='fourslash.ts'/>

// @strict: true

//// const optionals: ((a?: number) => unknown) & ((b?: string) => unknown) = (
////   arg,
//// ) =/**/> {};

verify.quickInfoAt(
  "",
  `function(arg: string | number | undefined): void`,
);