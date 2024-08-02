const { RuleTester } = require("./support/RuleTester.cjs");
const rule = require("../rules/debug-assert.cjs");

const ruleTester = new RuleTester({
    languageOptions: {
        parserOptions: {
            warnOnUnsupportedTypeScriptVersion: false,
        },
    },
});

ruleTester.run("debug-assert", rule, {
    valid: [
        {
            code: `Debug.assert(true)`,
        },
        {
            code: `Debug.assert(true, 'error message')`,
        },
        {
            code: `Debug.assert(true, 'error message 1', 'error message 2')`,
        },
        {
            code: `Debug.assert(true, 'error message 1', () => {})`,
        },
        {
            code: "Debug.assert(true, `error message 1`, () => {})",
        },
        {
            code: `Debug.assert(true, "error message 1", () => {})`,
        },
    ],

    invalid: [
        {
            code: `Debug.assert(true, 1)`,
            errors: [{ messageId: "secondArgumentDebugAssertError" }],
        },
        {
            code: `Debug.assert(true, 'error message', 1)`,
            errors: [{ messageId: "thirdArgumentDebugAssertError" }],
        },
        {
            code: `Debug.assert(true, null, 1)`,
            errors: [
                { messageId: "secondArgumentDebugAssertError" },
                { messageId: "thirdArgumentDebugAssertError" },
            ],
        },
    ],
});
