/// <reference path='fourslash.ts' />

//@Filename: file.tsx
// @jsx: preserve
// @noLib: true

//// declare function OverloadComponent<U>(attr: {b: U, a?: string, "ignore-prop": boolean}): JSX.Element;
//// declare function OverloadComponent<T, U>(attr: {b: U, a: T}): JSX.Element;
//// declare function OverloadComponent(): JSX.Element; // effective argument type of `{}`, needs to be last

//// function Baz<T extends {b: number}, U extends {a: boolean, b:string}>(arg1: T, arg2: U) {
////     let a0 = <Overloa/*1*/dComponent {...arg1} a="hello" ignore-prop />;
////     let a1 = <Overloa/*2*/dComponent {...arg2} ignore-pro="hello world" />;
////     let a2 = <Overloa/*3*/dComponent {...arg2} />;
////     let a3 = <Overloa/*4*/dComponent {...arg1} ignore-prop />;
////     let a4 = <Overloa/*5*/dComponent />;
////     let a5 = <Overloa/*6*/dComponent {...arg2} ignore-prop="hello" {...arg1} />;
////     let a6 = <Overloa/*7*/dComponent {...arg1} ignore-prop {...arg2} />;
//// }

verify.quickInfos({
    1: "function OverloadComponent<number>(attr: {\n    b: number;\n    a?: string;\n    \"ignore-prop\": boolean;\n}): JSX.Element (+2 overloads)",
    2: "function OverloadComponent<boolean, string>(attr: {\n    b: string;\n    a: boolean;\n}): JSX.Element (+2 overloads)",
    3: "function OverloadComponent<boolean, string>(attr: {\n    b: string;\n    a: boolean;\n}): JSX.Element (+2 overloads)",
    4: "function OverloadComponent(): JSX.Element (+2 overloads)", // Subtype pass chooses this overload, since `a` is missing from the top overload, and `ignore-prop` is missing from the second (while T & {ignore-prop: true} is a proper subtype of `{}`)
    5: "function OverloadComponent(): JSX.Element (+2 overloads)",
    6: "function OverloadComponent<boolean, never>(attr: {\n    b: never;\n    a: boolean;\n}): JSX.Element (+2 overloads)",
    7: "function OverloadComponent<boolean, never>(attr: {\n    b: never;\n    a: boolean;\n}): JSX.Element (+2 overloads)",
});
