const { RuleTester } = require("./support/RuleTester.cjs");
const rule = require("../rules/no-comparison-equality.cjs");

const ruleTester = new RuleTester({
    languageOptions: {
        parserOptions: {
            warnOnUnsupportedTypeScriptVersion: false,
        },
    },
});

ruleTester.run("no-comparison-equality", rule, {
    valid: [
        {
            code: `if (value > 0) {}`,
        },
        {
            code: `
if (value === Comparison.EqualTo) {}
if (value !== Comparison.EqualTo) {}
if (value == Comparison.EqualTo) {}
if (value != Comparison.EqualTo) {}
if (Comparison.EqualTo === value) {}
if (Comparison.EqualTo !== value) {}
if (Comparison.EqualTo == value) {}
if (Comparison.EqualTo != value) {}
            `,
        },
    ],

    invalid: [
        {
            code: `
switch (value) {
    case Comparison.EqualTo:
        break;
    case Comparison.GreaterThan:
        break;
    case Comparison.LessThan:
        break;
}
            `,
            errors: [
                { messageId: "noCompare" },
                { messageId: "noCompare" },
            ],
        },
        {
            code: `
if (value === Comparison.LessThan) {}
if (value !== Comparison.LessThan) {}
if (value == Comparison.LessThan) {}
if (value != Comparison.LessThan) {}
if (Comparison.LessThan === value) {}
if (Comparison.LessThan !== value) {}
if (Comparison.LessThan == value) {}
if (Comparison.LessThan != value) {}
            `,
            errors: [
                { messageId: "noCompare" },
                { messageId: "noCompare" },
                { messageId: "noCompare" },
                { messageId: "noCompare" },
                { messageId: "noCompare" },
                { messageId: "noCompare" },
                { messageId: "noCompare" },
                { messageId: "noCompare" },
            ],
        },
        {
            code: `
if (value === Comparison.GreaterThan) {}
if (value !== Comparison.GreaterThan) {}
if (value == Comparison.GreaterThan) {}
if (value != Comparison.GreaterThan) {}
if (Comparison.GreaterThan === value) {}
if (Comparison.GreaterThan !== value) {}
if (Comparison.GreaterThan == value) {}
if (Comparison.GreaterThan != value) {}
            `,
            errors: [
                { messageId: "noCompare" },
                { messageId: "noCompare" },
                { messageId: "noCompare" },
                { messageId: "noCompare" },
                { messageId: "noCompare" },
                { messageId: "noCompare" },
                { messageId: "noCompare" },
                { messageId: "noCompare" },
            ],
        },
        {
            code: `
if (value === Comparison.Something) {}
if (value !== Comparison.Something) {}
if (value == Comparison.Something) {}
if (value != Comparison.Something) {}
            `,
            errors: [
                { messageId: "noCompare" },
                { messageId: "noCompare" },
                { messageId: "noCompare" },
                { messageId: "noCompare" },
            ],
        },
    ],
});
