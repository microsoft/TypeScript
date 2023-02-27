const { RuleTester } = require("./support/RuleTester.cjs");
const rule = require("../rules/parameter-trivia.cjs");

const ruleTester = new RuleTester({
    parserOptions: {
        warnOnUnsupportedTypeScriptVersion: false,
    },
    parser: require.resolve("@typescript-eslint/parser"),
});

ruleTester.run("parameter-trivia", rule, {
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
    ],

    invalid: [
        {
            code: `
const fn = (prop: null) => {};
fn(null);
            `,
            errors: [{ messageId: "parameterTriviaArgumentError" }],
        },
        {
            code: `
const fn = (prop: boolean) => {};
fn(false);
            `,
            errors: [{ messageId: "parameterTriviaArgumentError" }],
        },
        {
            code: `
const fn = (prop: boolean) => {};
fn(/* boolean arg */false);
            `,
            errors: [{ messageId: "parameterTriviaArgumentSpaceError" }],
        },
        {
            code: `
const fn = (prop: boolean) => {};
fn(/* first comment */ /* second comment */ false);
            `,
            errors: [{ messageId: "parameterTriviaArgumentError" }],
        },
    ],
});
