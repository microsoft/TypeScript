const { RuleTester } = require("./support/RuleTester.cjs");
const rule = require("../rules/js-extensions.cjs");

const ruleTester = new RuleTester({
    languageOptions: {
        parserOptions: {
            warnOnUnsupportedTypeScriptVersion: false,
        },
    },
});

ruleTester.run("js-extensions", rule, {
    valid: [
        {
            code: `
import "some-library";
import "./a.js";
import "./a.mjs";
import "./a.cjs";
import "../foo/a.js";
import "../foo/a.mjs";
import "../foo/a.cjs";
        `,
        },
        {
            code: `
import * as blah from "some-library";
import * as blah from "./a.js";
import * as blah from "./a.mjs";
import * as blah from "./a.cjs";
import * as blah from "../foo/a.js";
import * as blah from "../foo/a.mjs";
import * as blah from "../foo/a.cjs";
        `,
        },
        {
            code: `
export * from "some-library";
export * from "./a.js";
export * from "./a.mjs";
export * from "./a.cjs";
export * from "../foo/a.js";
export * from "../foo/a.mjs";
export * from "../foo/a.cjs";
        `,
        },
        {
            code: `
import blah = require("some-library");
import blah = require("./a.js");
import blah = require("./a.mjs");
import blah = require("./a.cjs");
import blah = require("../foo/a.js");
import blah = require("../foo/a.mjs");
import blah = require("../foo/a.cjs");
        `,
        },
    ],

    invalid: [
        {
            code: `
import "./a";
import "../foo/a";
        `,
            errors: [
                {
                    messageId: "missingJsExtension",
                    line: 2,
                    column: 8,
                },
                {
                    messageId: "missingJsExtension",
                    line: 3,
                    column: 8,
                },
            ],
            output: `
import "./a.js";
import "../foo/a.js";
        `,
        },
        {
            code: `
import * as blah from "./a";
import * as blah from "../foo/a";
        `,
            errors: [
                {
                    messageId: "missingJsExtension",
                    line: 2,
                    column: 23,
                },
                {
                    messageId: "missingJsExtension",
                    line: 3,
                    column: 23,
                },
            ],
            output: `
import * as blah from "./a.js";
import * as blah from "../foo/a.js";
        `,
        },
        {
            code: `
export * from "./a";
export * from "../foo/a";
        `,
            errors: [
                {
                    messageId: "missingJsExtension",
                    line: 2,
                    column: 15,
                },
                {
                    messageId: "missingJsExtension",
                    line: 3,
                    column: 15,
                },
            ],
            output: `
export * from "./a.js";
export * from "../foo/a.js";
        `,
        },
        {
            code: `
import blah = require("./a");
import blah = require("../foo/a");
        `,
            errors: [
                {
                    messageId: "missingJsExtension",
                    line: 2,
                    column: 23,
                },
                {
                    messageId: "missingJsExtension",
                    line: 3,
                    column: 23,
                },
            ],
            output: `
import blah = require("./a.js");
import blah = require("../foo/a.js");
        `,
        },
    ],
});
