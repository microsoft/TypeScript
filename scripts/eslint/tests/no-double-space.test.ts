import { RuleTester, ROOT_DIR, FILENAME } from "./support/RuleTester";
import rule = require("../rules/no-double-space");

const ruleTester = new RuleTester({
    parser: require.resolve("@typescript-eslint/parser"),
    parserOptions: {
        warnOnUnsupportedTypeScriptVersion: false,
        tsconfigRootDir: ROOT_DIR,
        ecmaFeatures: {},
        ecmaVersion: 6,
        sourceType: "module",
        project: "./tsconfig.json",
    },
});

ruleTester.run("no-double-space", rule, {
    valid: [{
        filename: FILENAME,
        code: `const a = {};`,
    }, {
        filename: FILENAME,
        code: `function fn() {}`,
    }, {
        filename: FILENAME,
        code: `const a = "  ";`,
    }, {
        filename: FILENAME,
        code: `// ^                                ^`,
    }, {
        filename: FILENAME,
        code: `class Cl {}`,
    }, {
        filename: FILENAME,
        code: `// comment `,
    }, {
        filename: FILENAME,
        code: `/* comment */`,
    }, {
        filename: FILENAME,
        code: `"  string  ";`,
    }, {
        filename: FILENAME,
        code: `/  regexp  /g;`,
    }, {
        filename: FILENAME,
        code: `const rgx = /  regexp  /g;`,
    }, {
        filename: FILENAME,
        code: "const str = ` string template`;",
    }, {
        filename: FILENAME,
        code: `  // comment`,
    }, {
        filename: FILENAME,
        code: `   /* comment */`,
    }, {
        filename: FILENAME,
        code: `//  `,
    }, {
        filename: FILENAME,
        code: `
const a =
  1;
        `,
    }, {
        filename: FILENAME,
        code: `
/**
 * comment
 */
        `,
    }, {
        filename: FILENAME,
        code: `
// comment
//  - comment
//  - comment
        `,
    }, {
        filename: FILENAME,
        code: `
interface Props {
  prop: string[];  // comment prop
  propB: string[]; // comment propB
}
        `,
    }, {
        filename: FILENAME,
        code: `
/**
 * Returns a JSON-encoded value of the type: string[]
 *
 * @param exclude A JSON encoded string[] containing the paths to exclude
 *  when enumerating the directory.
 */
        `,
    }, {
        filename: FILENAME,
        code: `
const obj = {
  content: "function f() {  1; }",
};
        `,
    }],

    invalid: [{
        filename: FILENAME,
        code: `const  a  = {};`,
        errors: [{ messageId: "noDoubleSpaceError", line: 1, column: 6 }],
    }, {
        filename: FILENAME,
        code: `function  fn() {}`,
        errors: [{ messageId: "noDoubleSpaceError", line: 1, column: 9 }],
    }, {
        filename: FILENAME,
        code: `class  Cl {}`,
        errors: [{ messageId: "noDoubleSpaceError", line: 1, column: 6 }],
    }, {
        filename: FILENAME,
        code: "const str =  ` string template`;",
        errors: [{ messageId: "noDoubleSpaceError", line: 1, column: 12 }],
    }, {
        filename: FILENAME,
        code: `/** comment  */`,
        errors: [{ messageId: "noDoubleSpaceError", line: 1, column: 12 }],
    }, {
        filename: FILENAME,
        code: `/** comment  with  many spaces   */`,
        errors: [{ messageId: "noDoubleSpaceError", line: 1, column: 12 }],
    }, {
        filename: FILENAME,
        code: `// comment  with  many spaces`,
        errors: [{ messageId: "noDoubleSpaceError", line: 1, column: 11 }],
    }, {
        filename: FILENAME,
        code: `
const a = 1;
const b = 2;
const c =  3;
`.trim(),
        errors: [{ messageId: "noDoubleSpaceError", line: 3, column: 10 }],
    }],
});
