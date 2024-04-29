const { RuleTester } = require("./support/RuleTester.cjs");
const rule = require("../rules/bounds-check.cjs");

const ruleTester = new RuleTester({
    parserOptions: {
        warnOnUnsupportedTypeScriptVersion: false,
    },
    parser: require.resolve("@typescript-eslint/parser"),
});

ruleTester.run("bounds-check", rule, {
    valid: [
        {
            filename: "scanner.ts",
            code: `codePointChecked(0)`,
        },
        {
            filename: "scanner.ts",
            code: `charCodeChecked(0)`,
        },
        {
            filename: "foo.ts",
            code: `codePointUnchecked(0)`,
        },
        {
            filename: "foo.ts",
            code: `charCodeUnchecked(0)`,
        },
        {
            filename: "scanner.ts",
            code: "pos < end && charCodeUnchecked(pos)",
        },
        {
            filename: "scanner.ts",
            code: "!(pos >= end) && charCodeUnchecked(pos)",
        },
        {
            filename: "scanner.ts",
            code: "pos + 1 < end && charCodeUnchecked(pos)",
        },
        {
            filename: "scanner.ts",
            code: "pos >= end || charCodeUnchecked(pos)",
        },
        {
            filename: "scanner.ts",
            code: "pos < end ? charCodeUnchecked(pos) : null",
        },
        {
            filename: "scanner.ts",
            code: "pos >= end ? null : charCodeUnchecked(pos)",
        },
        {
            filename: "scanner.ts",
            code: "if (pos < end) charCodeUnchecked(pos)",
        },
        {
            filename: "scanner.ts",
            code: "if (pos < end) {charCodeUnchecked(pos)}",
        },
        {
            filename: "scanner.ts",
            code: "if (pos >= end); else charCodeUnchecked(pos)",
        },
        {
            filename: "scanner.ts",
            code: "if (pos >= end); else {charCodeUnchecked(pos)}",
        },
        {
            filename: "scanner.ts",
            code: "while (pos < end) charCodeUnchecked(pos)",
        },
        {
            filename: "scanner.ts",
            code: "while (pos < end) {charCodeUnchecked(pos)}",
        },
        {
            filename: "scanner.ts",
            code: "return pos >= 0 && pos < end ? codePointUnchecked(pos) : CharacterCodes.EOF;",
        },
        {
            filename: "scanner.ts",
            code: `
            if (
                pos + 2 < end &&
                codePointUnchecked(pos + 1) === CharacterCodes.u &&
                codePointUnchecked(pos + 2) === CharacterCodes.openBrace
            ) {}
            `,
        },
        {
            filename: "scanner.ts",
            code: `
            while (pos < end) {
                let ch = codePointUnchecked(pos);
            }
            `,
        },
        {
            filename: "scanner.ts",
            code: `
            while (pos < end && isWhiteSpaceSingleLine(charCodeUnchecked(pos)) && isWhiteSpaceSingleLine(charCodeUnchecked(pos))) {}`,
        },
    ],

    invalid: [
        {
            filename: "scanner.ts",
            code: `codePointUnchecked(0)`,
            errors: [{ messageId: "codePointUncheckedError" }],
        },
        {
            filename: "scanner.ts",
            code: `charCodeUnchecked(0)`,
            errors: [{ messageId: "charCodeUncheckedError" }],
        },
        {
            filename: "scanner.ts",
            code: `pos < end && charCodeUnchecked(pos + 1)`,
            errors: [{ messageId: "charCodeUncheckedError" }],
        },
        {
            filename: "scanner.ts",
            code: `!(pos < end) && charCodeUnchecked(pos)`,
            errors: [{ messageId: "charCodeUncheckedError" }],
        },
        {
            filename: "scanner.ts",
            code: `pos < end || charCodeUnchecked(pos)`,
            errors: [{ messageId: "charCodeUncheckedError" }],
        },
        {
            filename: "scanner.ts",
            code: `pos - 1 < end && charCodeUnchecked(pos)`,
            errors: [{ messageId: "charCodeUncheckedError" }],
        },
        {
            filename: "scanner.ts",
            code: `pos < end + 1 && charCodeUnchecked(pos)`,
            errors: [{ messageId: "charCodeUncheckedError" }],
        },
        {
            filename: "scanner.ts",
            code: "pos >= end ? charCodeUnchecked(pos) : null",
            errors: [{ messageId: "charCodeUncheckedError" }],
        },
        {
            filename: "scanner.ts",
            code: "pos < end ? null : charCodeUnchecked(pos)",
            errors: [{ messageId: "charCodeUncheckedError" }],
        },
        {
            filename: "scanner.ts",
            code: "if (pos >= end) charCodeUnchecked(pos)",
            errors: [{ messageId: "charCodeUncheckedError" }],
        },
        {
            filename: "scanner.ts",
            code: "if (pos >= end) {charCodeUnchecked(pos)}",
            errors: [{ messageId: "charCodeUncheckedError" }],
        },
        {
            filename: "scanner.ts",
            code: "if (pos < end); else charCodeUnchecked(pos)",
            errors: [{ messageId: "charCodeUncheckedError" }],
        },
        {
            filename: "scanner.ts",
            code: "if (pos < end); else {charCodeUnchecked(pos)}",
            errors: [{ messageId: "charCodeUncheckedError" }],
        },
        {
            filename: "scanner.ts",
            code: "while (pos >= end) charCodeUnchecked(pos)",
            errors: [{ messageId: "charCodeUncheckedError" }],
        },
        {
            filename: "scanner.ts",
            code: "while (pos >= end) {charCodeUnchecked(pos)}",
            errors: [{ messageId: "charCodeUncheckedError" }],
        },
        {
            filename: "scanner.ts",
            code: "pos < end && (pos++ || charCodeUnchecked(pos))",
            errors: [{ messageId: "charCodeUncheckedError" }],
        },
        {
            filename: "scanner.ts",
            code: "function createScanner() { text.charCodeAt(pos) }",
            errors: [{ messageId: "charCodeAtError" }],
        },
        {
            filename: "scanner.ts",
            code: String.raw`
                if (
                    isRegularExpression && shouldEmitInvalidEscapeError && escapedValue >= 0xD800 && escapedValue <= 0xDBFF &&
                    pos + 6 < end && text.substring(pos, pos + 2) === "\\u" && charCodeUnchecked(pos + 2) !== CharacterCodes.openBrace
                ) {}
            `,
            errors: [{ messageId: "charCodeUncheckedError" }],
        },
    ],
});
