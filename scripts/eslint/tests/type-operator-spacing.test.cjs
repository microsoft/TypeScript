const { RuleTester } = require("./support/RuleTester.cjs");
const rule = require("../rules/type-operator-spacing.cjs");

const ruleTester = new RuleTester({
    parserOptions: {
        warnOnUnsupportedTypeScriptVersion: false,
    },
    parser: require.resolve("@typescript-eslint/parser"),
});

ruleTester.run("type-operator-spacing", rule, {
    valid: [
        {
            code: `type T = string | number`,
        },
        {
            code: `type T = string & number`,
        },
        {
            code: `function fn(): string | number {}`,
        },
        {
            code: `function fn(): string & number {}`,
        },
    ],

    invalid: [
        {
            code: `type T = string|number`,
            errors: [{ messageId: "typeOperatorSpacingError" }],
        },
        {
            code: `type T = string&number`,
            errors: [{ messageId: "typeOperatorSpacingError" }],
        },
        {
            code: `function fn(): string|number {}`,
            errors: [{ messageId: "typeOperatorSpacingError" }],
        },
        {
            code: `function fn(): string&number {}`,
            errors: [{ messageId: "typeOperatorSpacingError" }],
        },
    ],
});
