/// <reference path="./fourslash.ts"/>

// https://github.com/microsoft/TypeScript/issues/60411

// @strict: true

//// type UnsetUndefinedToOblivion<T> = { [P in keyof T]-?: T[P] | undefined };
//// type SetUndefined<T> = { [P in keyof T]: T[P] | undefined };
//// type TheWhat/**/ = SetUndefined<UnsetUndefinedToOblivion<{ a?: 1 }>>;

verify.quickInfoAt("", `type TheWhat = {
    a: 1 | undefined;
}`);
