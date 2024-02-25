/// <reference path="fourslash.ts" />

// @strict: true
//// declare function constrainedPick<O extends { a?: 'a'; b?: 'b' }, T extends keyof O>(keys: T[], obj?: O): Pick<O, T>;
//// const _ = constrainedPick/*1*/(['b'], { a: 'a', b: 'b' });
//// const { } = constrainedPick/*2*/(['b'], { a: 'a', b: 'b' });
//// const { b } = constrainedPick/*3*/(['b'], { a: 'a', b: 'b' });

const expectedText = `function constrainedPick<{
    a: "a";
    b: "b";
}, "b">(keys: "b"[], obj?: {
    a: "a";
    b: "b";
} | undefined): Pick<{
    a: "a";
    b: "b";
}, "b">`;
verify.quickInfoAt("1", expectedText);
verify.quickInfoAt("2", expectedText);
verify.quickInfoAt("3", expectedText);
