const { RuleTester } = require("./support/RuleTester.cjs");
const rule = require("../rules/no-double-space.cjs");

const ruleTester = new RuleTester({
    parser: require.resolve("@typescript-eslint/parser"),
    parserOptions: {
        warnOnUnsupportedTypeScriptVersion: false,
    },
});

ruleTester.run("no-double-space", rule, {
    valid: [
        {
            code: `const a = {};`,
        },
        {
            code: `function fn() {}`,
        },
        {
            code: `const a = "  ";`,
        },
        {
            code: `// ^                                ^`,
        },
        {
            code: `class Cl {}`,
        },
        {
            code: `// comment `,
        },
        {
            code: `/* comment */`,
        },
        {
            code: `"  string  ";`,
        },
        {
            code: `/  regexp  /g;`,
        },
        {
            code: `const rgx = /  regexp  /g;`,
        },
        {
            code: "const str = ` string template`;",
        },
        {
            code: `  // comment`,
        },
        {
            code: `   /* comment */`,
        },
        {
            code: `//  `,
        },
        {
            code: `
const a =
  1;
            `,
        },
        {
            code: `
/**
 * comment
 */
            `,
        },
        {
            code: `
// comment
//  - comment
//  - comment
            `,
        },
        {
            code: `
interface Props {
  prop: string[];  // comment prop
  propB: string[]; // comment propB
}
            `,
        },
        {
            code: `
/**
 * Returns a JSON-encoded value of the type: string[]
 *
 * @param exclude A JSON encoded string[] containing the paths to exclude
 *  when enumerating the directory.
 */
            `,
        },
        {
            code: `
const obj = {
  content: "function f() {  1; }",
};
            `,
        },
    ],

    invalid: [
        {
            code: `const  a  = {};`,
            errors: [
                { messageId: "noDoubleSpaceError", line: 1, column: 6 },
            ],
        },
        {
            code: `function  fn() {}`,
            errors: [
                { messageId: "noDoubleSpaceError", line: 1, column: 9 },
            ],
        },
        {
            code: `class  Cl {}`,
            errors: [{ messageId: "noDoubleSpaceError", line: 1, column: 6 }],
        },
        {
            code: "const str =  ` string template`;",
            errors: [
                { messageId: "noDoubleSpaceError", line: 1, column: 12 },
            ],
        },
        {
            code: `/** comment  */`,
            errors: [
                { messageId: "noDoubleSpaceError", line: 1, column: 12 },
            ],
        },
        {
            code: `/** comment  with  many spaces   */`,
            errors: [
                { messageId: "noDoubleSpaceError", line: 1, column: 12 },
            ],
        },
        {
            code: `// comment  with  many spaces`,
            errors: [
                { messageId: "noDoubleSpaceError", line: 1, column: 11 },
            ],
        },
        {
            code: `
const a = 1;
const b = 2;
const c =  3;
            `,
            errors: [
                { messageId: "noDoubleSpaceError", line: 4, column: 10 },
            ],
        },
    ],
});
