import { RuleTester, ROOT_DIR, FILENAME } from "./support/RuleTester";
import rule = require("../rules/boolean-trivia");

const ruleTester = new RuleTester({
    parserOptions: {
        warnOnUnsupportedTypeScriptVersion: false,
        tsconfigRootDir: ROOT_DIR,
        ecmaFeatures: {},
        ecmaVersion: 6,
        sourceType: "module",
        project: "./tsconfig.json",
    },
    parser: require.resolve("@typescript-eslint/parser"),
});

ruleTester.run("boolean-trivia", rule, {
    valid: [{
        filename: FILENAME,
        code: `
const fn = (prop: boolean) => {};
fn(/* boolean prop */ true);
        `,
    }, {
        filename: FILENAME,
        code: `
const fn = (prop: null) => {};
fn(/* null prop */ null);
        `,
    }, {
        filename: FILENAME,
        code: `
const fn = (prop: null) => {};
fn(/*null prop*/ null);
        `,
    }, {
        filename: FILENAME,
        code: `
const fn = (prop: boolean) => {};
fn(/* comment */
    false
);
        `,
    }, {
        filename: FILENAME,
        code: `
const fn = (prop: boolean) => {};
fn.apply(null, true);
        `,
    }],

    invalid: [{
        filename: FILENAME,
        code: `
const fn = (prop: null) => {};
fn(null);
        `,
        errors: [{ messageId: "booleanTriviaArgumentError" }],
    }, {
        filename: FILENAME,
        code: `
const fn = (prop: boolean) => {};
fn(false);
        `,
        errors: [{ messageId: "booleanTriviaArgumentError" }],
    }, {
        filename: FILENAME,
        code: `
const fn = (prop: boolean) => {};
fn(/* boolean arg */false);
        `,
        errors: [{ messageId: "booleanTriviaArgumentSpaceError" }],
    }, {
        filename: FILENAME,
        code: `
const fn = (prop: boolean) => {};
fn(/* first comment */ /* second comment */ false);
        `,
        errors: [{ messageId: "booleanTriviaArgumentError" }],
    }],
});
