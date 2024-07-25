/// <reference path='fourslash.ts'/>

// based on https://github.com/microsoft/TypeScript/issues/55574

//// declare const rest:
////   | ((v: { a: true }, ...rest: string[]) => unknown)
////   | ((v: { b: true }) => unknown);
////
//// /**/rest({ a: true, b: true }, "foo", "bar");

verify.quickInfoAt(
  "",
  `const rest: (v: {
    a: true;
} & {
    b: true;
}, ...rest: string[]) => unknown`,
);
