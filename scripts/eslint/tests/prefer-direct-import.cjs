const { RuleTester } = require("./support/RuleTester.cjs");
const rule = require("../rules/prefer-direct-import.cjs");

const ruleTester = new RuleTester({
    parserOptions: {
        warnOnUnsupportedTypeScriptVersion: false,
    },
    parser: require.resolve("@typescript-eslint/parser"),
});

ruleTester.run("no-ts-debug", rule, {
    valid: [
        {
            code: `
import * as Debug from "./debug";
        `,
        },
        {
            code: `
import type { Debug } from "./_namespaces/ts";
            `,
        },
        {
            code: `
import { type Debug } from "./_namespaces/ts";
            `,
        },
    ],

    invalid: [
        {
            code: `
import { Debug } from "./_namespaces/ts";
            `,
            errors: [{ messageId: "importError", data: { name: "Debug", path: "compiler/debug" } }],
        },
        {
            code: `
import { Debug } from "./_namespaces/ts.js";
            `,
            errors: [{ messageId: "importError", data: { name: "Debug", path: "compiler/debug" } }],
        },
        {
            code: `
import * as ts from "./_namespaces/ts";

ts.Debug.assert(true);
            `,
            errors: [{ messageId: "importError", data: { name: "Debug", path: "compiler/debug" } }],
        },
    ],
});
