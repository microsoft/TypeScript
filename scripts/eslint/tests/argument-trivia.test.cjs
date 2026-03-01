const { RuleTester } = require("./support/RuleTester.cjs");
const rule = require("../rules/argument-trivia.cjs");

const ruleTester = new RuleTester({
    languageOptions: {
        parserOptions: {
            warnOnUnsupportedTypeScriptVersion: false,
        },
    },
});

ruleTester.run("argument-trivia", rule, {
    valid: [
        {
            code: `
const fn = (prop: boolean) => {};
fn(/* boolean prop */ true);
            `,
        },
        {
            code: `
const fn = (prop: null) => {};
fn(/* null prop */ null);
            `,
        },
        {
            code: `
const fn = (prop: undefined) => {};
fn(/* undefined prop */ undefined);
            `,
        },
        {
            code: `
const fn = (prop: null) => {};
fn(/*null prop*/ null);
            `,
        },
        {
            code: `
const fn = (prop: boolean) => {};
fn(/* comment */
    false
);
            `,
        },
        {
            code: `
const fn = (prop: boolean) => {};
fn.apply(null, true);
        `,
        },
        {
            code: `
const fn = (prop: boolean) => {};
fn(/* first comment */ /* second comment */ false);
            `,
        },
    ],

    invalid: [
        {
            code: `
const fn = (prop: null) => {};
fn(null);
            `,
            errors: [{ messageId: "argumentTriviaArgumentError" }],
        },
        {
            code: `
const fn = (prop: boolean) => {};
fn(false);
            `,
            errors: [{ messageId: "argumentTriviaArgumentError" }],
        },
        {
            code: `
const fn = (prop: boolean) => {};
fn(/* boolean arg */false);
            `,
            errors: [{ messageId: "argumentTriviaArgumentSpaceError" }],
            output: `
const fn = (prop: boolean) => {};
fn(/* boolean arg */ false);
            `,
        },
    ],
});
