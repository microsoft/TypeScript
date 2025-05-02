const { RuleTester } = require("./support/RuleTester.cjs");
const rule = require("../rules/no-in-operator.cjs");

const ruleTester = new RuleTester({
    languageOptions: {
        parserOptions: {
            warnOnUnsupportedTypeScriptVersion: false,
        },
    },
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
