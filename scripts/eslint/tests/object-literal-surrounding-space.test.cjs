const { RuleTester } = require("./support/RuleTester.cjs");
const rule = require("../rules/object-literal-surrounding-space.cjs");

const ruleTester = new RuleTester({
    parserOptions: {
        warnOnUnsupportedTypeScriptVersion: false,
    },
    parser: require.resolve("@typescript-eslint/parser"),
});

ruleTester.run("object-literal-surrounding-space", rule, {
    valid: [
        {
            code: `const prop = {}`,
        },
        {
            code: `const prop = { }`,
        },
        {
            code: `const prop = { x: 1 }`,
        },
    ],

    invalid: [
        {
            code: `const prop = {x: 1}`,
            errors: [
                { messageId: "leadingStringError" },
                { messageId: "trailingStringError" }
            ],
        },
        {
            code: `const prop = {  x: 1 }`,
            errors: [{ messageId: "leadingExcessStringError" }],
        },
        {
            code: `const prop = { x: 1  }`,
            errors: [{ messageId: "trailingExcessStringError" }],
        },
        {
            code: `const prop = { x: 1}`,
            errors: [{ messageId: "trailingStringError" }],
        },
        {
            code: `const prop = {x: 1 }`,
            errors: [{ messageId: "leadingStringError" }],
        },
    ],
});
