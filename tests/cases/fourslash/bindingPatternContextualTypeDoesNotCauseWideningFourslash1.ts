/// <reference path="fourslash.ts" />

// @strict: true
//// declare function pick<O, T extends keyof O>(keys: T[], obj?: O): Pick<O, T>;
//// const _ = pick/*1*/(['b'], { a: 'a', b: 'b' });
//// const { } = pick/*2*/(['b'], { a: 'a', b: 'b' });
//// const { b } = pick/*3*/(['b'], { a: 'a', b: 'b' });

const expectedText = `function pick<{
    a: string;
    b: string;
}, "b">(keys: "b"[], obj?: {
    a: string;
    b: string;
} | undefined): Pick<{
    a: string;
    b: string;
}, "b">`;
verify.quickInfoAt("1", expectedText);
verify.quickInfoAt("2", expectedText);
verify.quickInfoAt("3", expectedText);
