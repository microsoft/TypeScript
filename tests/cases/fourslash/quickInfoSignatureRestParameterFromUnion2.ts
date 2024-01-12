/// <reference path='fourslash.ts'/>

// https://github.com/microsoft/TypeScript/issues/55574

//// declare const rest:
////   | ((a?: { a: true }, ...rest: string[]) => unknown)
////   | ((b?: { b: true }) => unknown);
////
//// /**/rest({ a: true, b: true }, "foo", "bar");

verify.quickInfoAt(
  "",
  `const rest: (arg0?: {
    a: true;
} & {
    b: true;
}, ...rest: string[]) => unknown`,
);
