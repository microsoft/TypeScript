const { RuleTester } = require("./support/RuleTester.cjs");
const rule = require("../rules/prefer-direct-import.cjs");

const ruleTester = new RuleTester({
    parserOptions: {
        warnOnUnsupportedTypeScriptVersion: false,
    },
    parser: require.resolve("@typescript-eslint/parser"),
});

// ruleTester.run("no-ts-debug", rule, {
//     valid: [
//         {
//             code: `
// import * as Debug from "./debug";
//         `,
//         },
//         {
//             code: `
// import type { Debug } from "./_namespaces/ts";
//             `,
//         },
//         {
//             code: `
// import { type Debug } from "./_namespaces/ts";
//             `,
//         },
//     ],

//     invalid: [
//         {
//             filename: "src/compiler/checker.ts",
//             code: `
// import { Debug } from "./_namespaces/ts";
//             `.replace(/\r?\n/g, "\r\n"),
//             errors: [{ messageId: "importError", data: { name: "Debug", path: "compiler/debug" } }],
//             output: `
// import * as Debug from "./debug";
//             `.replace(/\r?\n/g, "\r\n"),
//         },
//         {
//             filename: "src/compiler/transformers/ts.ts",
//             code: `
// import { Debug } from "../_namespaces/ts";
//             `.replace(/\r?\n/g, "\r\n"),
//             errors: [{ messageId: "importError", data: { name: "Debug", path: "compiler/debug" } }],
//             output: `
// import * as Debug from "../debug";
//             `.replace(/\r?\n/g, "\r\n"),
//         },
//         // TODO(jakebailey): the rule probably needs to handle .js extensions
//         {
//             filename: "src/compiler/checker.ts",
//             code: `
// import { Debug } from "./_namespaces/ts.js";
//             `.replace(/\r?\n/g, "\r\n"),
//             errors: [{ messageId: "importError", data: { name: "Debug", path: "compiler/debug" } }],
//             output: `
// import * as Debug from "./debug";
//             `.replace(/\r?\n/g, "\r\n"),
//         },
//         {
//             filename: "src/compiler/checker.ts",
//             code: `
// import * as ts from "./_namespaces/ts";

// ts.Debug.assert(true);
//             `.replace(/\r?\n/g, "\r\n"),
//             errors: [{ messageId: "importError", data: { name: "Debug", path: "compiler/debug" } }],
//             output: `
// import * as Debug from "./debug";
// import * as ts from "./_namespaces/ts";

// Debug.assert(true);
//             `.replace(/\r?\n/g, "\r\n"),
//         },
//     ],
// });
