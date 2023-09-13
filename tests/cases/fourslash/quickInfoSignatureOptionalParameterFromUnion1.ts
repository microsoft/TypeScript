/// <reference path='fourslash.ts'/>

// https://github.com/microsoft/TypeScript/issues/55574

//// declare const optionals:
////   | ((a?: { a: true }) => unknown)
////   | ((b?: { b: true }) => unknown);
////
//// /**/optionals();

verify.quickInfoAt(
  "",
  `const optionals: (arg0?: {
    a: true;
} & {
    b: true;
}) => unknown`,
);
