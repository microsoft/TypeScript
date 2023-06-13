const { RuleTester } = require("./support/RuleTester.cjs");
const rule = require("../rules/no-in-operator.cjs");

const ruleTester = new RuleTester({
    parserOptions: {
        warnOnUnsupportedTypeScriptVersion: false,
    },
    parser: require.resolve("@typescript-eslint/parser"),
});

ruleTester.run("no-in-operator", rule, {
    valid: [
        {
            code: `
const prop = {};
prop.hasProperty('a');
        `,
        },
    ],

    invalid: [
        {
            code: `
const prop = {};
prop in 'a';
            `,
            errors: [{ messageId: "noInOperatorError" }],
        },
    ],
});
