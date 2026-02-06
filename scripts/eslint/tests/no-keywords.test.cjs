const { RuleTester } = require("./support/RuleTester.cjs");
const rule = require("../rules/no-keywords.cjs");

const ruleTester = new RuleTester({
    languageOptions: {
        parserOptions: {
            warnOnUnsupportedTypeScriptVersion: false,
        },
    },
});

ruleTester.run("no-keywords", rule, {
    valid: [
        {
            code: `const a = {};`,
        },
        {
            code: `function a() {};`,
        },
        {
            code: `const x = function string() {};`,
        },
        {
            code: `const y = function () {};`,
        },
        {
            code: `const y = () => {};`,
        },
        {
            code: `
class A {
    b = () => {}
    a() {}
    number() {}
}
            `,
        },
        {
            code: `
interface A {
    b(): void;
}
            `,
        },
        {
            code: `
const obj = {
    a: null,
    b() {},
    c: function (c: number) {},
    string: function d (d: string) {},
    e: () => {},
};
            `,
        },
        {
            code: `() => undefined`,
        },
        {
            code: `let a = 2;`,
        },
        {
            code: `let b: any;`,
        },
        {
            code: `function foo(a: any) { }`,
        },
        {
            code: `let [a] = [5];`,
        },
        {
            code: `const { a } = { a: 5 };`,
        },
        {
            code: `
interface Foo {
    number: string;
}
            `,
        },
    ],

    invalid: [
        {
            code: `const number = 1;`,
            errors: [{ messageId: "noKeywordsError" }],
        },
        {
            code: `function x(number: number) {};`,
            errors: [{ messageId: "noKeywordsError" }],
        },
        {
            code: `const y = function (number: number) {};`,
            errors: [{ messageId: "noKeywordsError" }],
        },
        {
            code: `const y = (number: number) => {};`,
            errors: [{ messageId: "noKeywordsError" }],
        },
        {
            code: `
class A {
    b = function (any: any) {};
    a(number: number) {}
}
            `,
            errors: [
                { messageId: "noKeywordsError" },
                { messageId: "noKeywordsError" },
            ],
        },
        {
            code: `
interface A {
    a(number: number): void;
    b: (any: any) => void;
}
            `,
            errors: [
                { messageId: "noKeywordsError" },
                { messageId: "noKeywordsError" },
            ],
        },
        {
            code: `let undefined = 8;`,
            errors: [{ messageId: "noKeywordsError" }],
        },
        {
            code: `let boolean: boolean;`,
            errors: [{ messageId: "noKeywordsError" }],
        },
        {
            code: `function foo(any: any) { }`,
            errors: [{ messageId: "noKeywordsError" }],
        },
        {
            code: `let [number] = [3];`,
            errors: [{ messageId: "noKeywordsError" }],
        },
        {
            code: `let { String } = { String: 1 };`,
            errors: [{ messageId: "noKeywordsError" }],
        },
        {
            code: `let [number, string] = [3, ''];`,
            errors: [
                { messageId: "noKeywordsError" },
                { messageId: "noKeywordsError" },
            ],
        },
        {
            code: `let { String, Boolean } = { String: 1, Boolean: false };`,
            errors: [
                { messageId: "noKeywordsError" },
                { messageId: "noKeywordsError" },
            ],
        },
    ],
});
