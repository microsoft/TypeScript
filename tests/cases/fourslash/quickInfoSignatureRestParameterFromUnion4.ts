/// <reference path='fourslash.ts'/>

//// declare const fn:
////   | ((a?: { x: number }, b?: { x: number }) => number)
////   | ((...a: { y: number }[]) => number);
////
//// /**/fn();

verify.quickInfoAt(
  "",
  `const fn: (a?: {
    x: number;
} & {
    y: number;
}, b?: {
    x: number;
} & {
    y: number;
}, ...args: {
    y: number;
}[]) => number`,
);
