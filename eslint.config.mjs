// @ts-check
import eslint from "@eslint/js";
import * as regexpPlugin from "eslint-plugin-regexp";
import fs from "fs";
import globals from "globals";
import { createRequire } from "module";
import path from "path";
import tseslint from "typescript-eslint";
import url from "url";

const __filename = url.fileURLToPath(new URL(import.meta.url));
const __dirname = path.dirname(__filename);

const require = createRequire(import.meta.url);

const rulesDir = path.join(__dirname, "scripts", "eslint", "rules");
const ext = ".cjs";
const ruleFiles = fs.readdirSync(rulesDir).filter(p => p.endsWith(ext));

export default tseslint.config(
    {
        files: ["**/*.{ts,tsx,cts,mts,js,cjs,mjs}"],
    },
    {
        ignores: [
            "**/node_modules/**",
            "built/**",
            "tests/**",
            "lib/**",
            "src/lib/*.generated.d.ts",
            "scripts/**/*.js",
            "scripts/**/*.d.*",
            "internal/**",
            "coverage/**",
        ],
    },
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    ...tseslint.configs.stylistic,
    regexpPlugin.configs["flat/recommended"],
    {
        plugins: {
            local: {
                rules: Object.fromEntries(ruleFiles.map(p => {
                    return [p.slice(0, -ext.length), require(path.join(rulesDir, p))];
                })),
            },
        },
    },
    {
        languageOptions: {
            parserOptions: {
                warnOnUnsupportedTypeScriptVersion: false,
            },
            globals: globals.node,
        },
    },
    {
        rules: {
            // eslint
            "dot-notation": "error",
            "eqeqeq": "error",
            "no-caller": "error",
            "no-constant-condition": ["error", { checkLoops: false }],
            "no-eval": "error",
            "no-extra-bind": "error",
            "no-new-func": "error",
            "no-new-wrappers": "error",
            "no-return-await": "error",
            "no-template-curly-in-string": "error",
            "no-throw-literal": "error",
            "no-undef-init": "error",
            "no-var": "error",
            "object-shorthand": "error",
            "prefer-const": "error",
            "prefer-object-spread": "error",
            "unicode-bom": ["error", "never"],

            "no-restricted-syntax": [
                "error",
                {
                    selector: "Literal[raw=null]",
                    message: "Avoid using null; use undefined instead.",
                },
                {
                    selector: "TSNullKeyword",
                    message: "Avoid using null; use undefined instead.",
                },
            ],

            // Enabled in eslint:recommended, but not applicable here
            "no-extra-boolean-cast": "off",
            "no-case-declarations": "off",
            "no-cond-assign": "off",
            "no-control-regex": "off",
            "no-inner-declarations": "off",

            // @typescript-eslint/eslint-plugin
            "@typescript-eslint/naming-convention": [
                "error",
                { selector: "typeLike", format: ["PascalCase"], filter: { regex: "^(__String|[A-Za-z]+_[A-Za-z]+)$", match: false } },
                { selector: "interface", format: ["PascalCase"], custom: { regex: "^I[A-Z]", match: false }, filter: { regex: "^I(Arguments|TextWriter|O([A-Z][a-z]+[A-Za-z]*)?)$", match: false } },
                { selector: "variable", format: ["camelCase", "PascalCase", "UPPER_CASE"], leadingUnderscore: "allow", filter: { regex: "^(_{1,2}filename|_{1,2}dirname|_+|[A-Za-z]+_[A-Za-z]+)$", match: false } },
                { selector: "function", format: ["camelCase", "PascalCase"], leadingUnderscore: "allow", filter: { regex: "^[A-Za-z]+_[A-Za-z]+$", match: false } },
                { selector: "parameter", format: ["camelCase"], leadingUnderscore: "allow", filter: { regex: "^(_+|[A-Za-z]+_[A-Z][a-z]+)$", match: false } },
                { selector: "method", format: ["camelCase", "PascalCase"], leadingUnderscore: "allow", filter: { regex: "^([0-9]+|[A-Za-z]+_[A-Za-z]+)$", match: false } },
                { selector: "memberLike", format: ["camelCase"], leadingUnderscore: "allow", filter: { regex: "^([0-9]+|[A-Za-z]+_[A-Za-z]+)$", match: false } },
                { selector: "enumMember", format: ["camelCase", "PascalCase"], leadingUnderscore: "allow", filter: { regex: "^[A-Za-z]+_[A-Za-z]+$", match: false } },
                // eslint-disable-next-line no-restricted-syntax
                { selector: "property", format: null },
            ],

            "@typescript-eslint/unified-signatures": "error",
            "no-unused-expressions": "off",
            "@typescript-eslint/no-unused-expressions": ["error", { allowTernary: true }],

            // Rules enabled in typescript-eslint configs that are not applicable here
            "@typescript-eslint/ban-ts-comment": "off",
            "@typescript-eslint/class-literal-property-style": "off",
            "@typescript-eslint/consistent-indexed-object-style": "off",
            "@typescript-eslint/consistent-generic-constructors": "off",
            "@typescript-eslint/no-duplicate-enum-values": "off",
            "@typescript-eslint/no-empty-function": "off",
            "@typescript-eslint/no-namespace": "off",
            "@typescript-eslint/no-non-null-asserted-optional-chain": "off",
            "@typescript-eslint/no-var-requires": "off",
            "@typescript-eslint/no-empty-interface": "off",
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-empty-object-type": "off", // {} is a totally useful and valid type.
            "@typescript-eslint/no-require-imports": "off",
            "@typescript-eslint/no-unused-vars": [
                "warn",
                {
                    // Ignore: (solely underscores | starting with exactly one underscore)
                    argsIgnorePattern: "^(_+$|_[^_])",
                    varsIgnorePattern: "^(_+$|_[^_])",
                    // Not setting an ignore pattern for caught errors; those can always be safely removed.
                },
            ],
            "@typescript-eslint/no-inferrable-types": "off",

            // Pending https://github.com/typescript-eslint/typescript-eslint/issues/4820
            "@typescript-eslint/prefer-optional-chain": "off",

            // scripts/eslint/rules
            "local/only-arrow-functions": [
                "error",
                {
                    allowNamedFunctions: true,
                    allowDeclarations: true,
                },
            ],
            "local/argument-trivia": "error",
            "local/no-in-operator": "error",
            "local/debug-assert": "error",
            "local/no-keywords": "error",
            "local/jsdoc-format": "error",
            "local/js-extensions": "error",
            "local/no-array-mutating-method-expressions": "error",
        },
    },
    {
        files: ["**/*.mjs", "**/*.mts"],
        rules: {
            // These globals don't exist outside of CJS files.
            "no-restricted-globals": [
                "error",
                { name: "__filename" },
                { name: "__dirname" },
                { name: "require" },
                { name: "module" },
                { name: "exports" },
            ],
        },
    },
    {
        files: ["src/**"],
        languageOptions: {
            parserOptions: {
                tsconfigRootDir: __dirname,
                project: "./src/tsconfig-eslint.json",
            },
        },
    },
    {
        files: ["scripts/**"],
        languageOptions: {
            parserOptions: {
                tsconfigRootDir: __dirname,
                project: "./scripts/tsconfig.json",
            },
        },
    },
    {
        files: ["src/**"],
        rules: {
            "@typescript-eslint/no-unnecessary-type-assertion": "error",
            "no-restricted-globals": [
                "error",
                { name: "setTimeout" },
                { name: "clearTimeout" },
                { name: "setInterval" },
                { name: "clearInterval" },
                { name: "setImmediate" },
                { name: "clearImmediate" },
                { name: "performance" },
            ],
            "local/no-direct-import": "error",
        },
    },
    {
        files: ["src/harness/**", "src/testRunner/**"],
        rules: {
            "no-restricted-globals": "off",
            "regexp/no-super-linear-backtracking": "off",
            "local/no-direct-import": "off",
        },
    },
    {
        files: ["src/**/_namespaces/**"],
        rules: {
            "local/no-direct-import": "off",
        },
    },
    {
        files: ["src/lib/*.d.ts"],
        ...tseslint.configs.disableTypeChecked,
    },
    {
        files: ["src/lib/*.d.ts"],
        languageOptions: {
            globals: {},
        },
        rules: {
            "@typescript-eslint/interface-name-prefix": "off",
            "@typescript-eslint/prefer-function-type": "off",
            "@typescript-eslint/unified-signatures": "off",
            "@typescript-eslint/no-unsafe-function-type": "off",
            "@typescript-eslint/no-wrapper-object-types": "off",
            "@typescript-eslint/no-unused-vars": "off",

            // scripts/eslint/rules
            "local/no-keywords": "off",

            // eslint
            "no-var": "off",
            "no-restricted-globals": "off",
            "no-shadow-restricted-names": "off",
            "no-restricted-syntax": "off",
        },
    },
    {
        files: ["src/lib/es2019.array.d.ts"],
        rules: {
            "@typescript-eslint/array-type": "off",
        },
    },
);
