import { RuleTester } from "./support/RuleTester";
import rule = require("../rules/async-type");

const ruleTester = new RuleTester({
    parserOptions: {
        warnOnUnsupportedTypeScriptVersion: false,
    },
    parser: require.resolve("@typescript-eslint/parser"),
});

ruleTester.run("async-type", rule, {
    valid: [
        {
            code: `
async function foo(): Promise<void> {}
            `,
        },
        {
            code: `
const fn = async function(): Promise<void> {}
            `,
        },
        {
            code: `
const fn = async (): Promise<void> => {}
            `,
        },
        {
            code: `
class C {
    async method(): Promise<void> {}
}
            `,
        },
    ],

    invalid: [
        {
            code: `async function foo() {}`,
            errors: [{ messageId: "asyncTypeError" }]
        },
        {
            code: `const fn = async function() {}`,
            errors: [{ messageId: "asyncTypeError" }]
        },
        {
            code: `const fn = async () => {}`,
            errors: [{ messageId: "asyncTypeError" }]
        },
        {
            code: `class C { async method() {} }`,
            errors: [{ messageId: "asyncTypeError" }]
        },
    ]
});