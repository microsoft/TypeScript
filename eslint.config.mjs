// @ts-check
import eslint from "@eslint/js";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
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
    /** @type {any} */ (eslintPluginUnicorn.configs["flat/recommended"]),
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
            "@typescript-eslint/no-duplicate-enum-values": "off",
            "@typescript-eslint/no-empty-function": "off",
            "@typescript-eslint/no-namespace": "off",
            "@typescript-eslint/no-non-null-asserted-optional-chain": "off",
            "@typescript-eslint/no-var-requires": "off",
            "@typescript-eslint/no-empty-interface": "off",
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/ban-types": [
                "error",
                {
                    extendDefaults: true,
                    types: {
                        // This is theoretically good, but ts-eslint appears to mistake our declaration of Symbol for the global Symbol type.
                        // See: https://github.com/typescript-eslint/typescript-eslint/issues/7306
                        "Symbol": false,
                        "{}": false, // {} is a totally useful and valid type.
                    },
                },
            ],
            "@typescript-eslint/no-unused-vars": [
                "warn",
                {
                    // Ignore: (solely underscores | starting with exactly one underscore)
                    argsIgnorePattern: "^(_+$|_[^_])",
                    varsIgnorePattern: "^(_+$|_[^_])",
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

            // eslint-plugin-unicorn
            // good
            "unicorn/prefer-includes": "error",
            "unicorn/new-for-builtins": "error",
            "unicorn/prefer-logical-operator-over-ternary": "error",
            "unicorn/no-instanceof-array": "error",
            "unicorn/prefer-optional-catch-binding": "error",
            "unicorn/require-array-join-separator": "error",
            "unicorn/throw-new-error": "error",
            "unicorn/no-useless-spread": "error",
            "unicorn/no-useless-fallback-in-spread": "error",
            "unicorn/prefer-modern-math-apis": "error",
            "unicorn/prefer-array-find": "error",
            "unicorn/prefer-array-some": "error",
            "unicorn/prefer-date-now": "error",
            "unicorn/prefer-object-from-entries": "error",
            "unicorn/no-new-buffer": "error",
            "unicorn/prefer-set-has": "error",
            "unicorn/prefer-string-trim-start-end": "error",
            "unicorn/no-zero-fractions": "error",
            "unicorn/prefer-regexp-test": "error",
            "unicorn/number-literal-case": "error",

            // likely yes
            "unicorn/error-message": "off", // https://github.com/sindresorhus/eslint-plugin-unicorn/issues/2265

            // no
            "unicorn/filename-case": "off",
            "unicorn/prevent-abbreviations": "off",
            "unicorn/empty-brace-spaces": "off",
            "unicorn/catch-error-name": "off",
            "unicorn/prefer-module": "off",
            "unicorn/switch-case-braces": "off",
            "unicorn/numeric-separators-style": "off",
            "unicorn/import-style": "off",
            "unicorn/consistent-function-scoping": "off",
            "unicorn/text-encoding-identifier-case": "off",
            "unicorn/no-process-exit": "off",
            "unicorn/prefer-export-from": "off",
            "unicorn/prefer-ternary": "off",
            "unicorn/template-indent": "off",
            "unicorn/no-array-callback-reference": "off",
            "unicorn/no-array-method-this-argument": "off", // false positives
            "unicorn/no-nested-ternary": "off",
            "unicorn/consistent-destructuring": "off", // false positives
            "unicorn/no-hex-escape": "off",
            "unicorn/no-object-as-default-parameter": "off",
            "unicorn/escape-case": "off",
            "unicorn/prefer-type-error": "off",
            "unicorn/no-await-expression-member": "off",
            "unicorn/no-useless-undefined": "off",
            "unicorn/no-negated-condition": "off",
            "unicorn/no-lonely-if": "off",
            "unicorn/prefer-math-trunc": "off", // Treats `1 << 0` as invalid
            "unicorn/no-array-for-each": "off", // false positives
            "unicorn/no-for-loop": "off", // quick fix produces slower `.entries()`
            "unicorn/prefer-at": "off", // perf
            "unicorn/prefer-switch": "off", // quick fix produces non-idiomatic code for this repo
            "unicorn/no-typeof-undefined": "off", // False positive when checking for a global without throwing
            "unicorn/no-null": "off", // if we remove the other plugin
            "unicorn/prefer-number-properties": "off",
            "unicorn/prefer-string-replace-all": "off", // not available in node 14
            "unicorn/no-array-push-push": "off",
            "unicorn/no-new-array": "off", // I like it, but we have a few canonical use cases
            "unicorn/explicit-length-check": "off", // I like it, but it's a lot of changes
            "unicorn/prefer-node-protocol": "off", // I like it, but it's pure style
            "unicorn/prefer-code-point": "off", // I suspect this is correct, but it's a lot of changes in fiddly bits of the code
            "unicorn/no-array-reduce": "off",
            "unicorn/no-useless-switch-case": "off",
            "unicorn/prefer-native-coercion-functions": "off",
            "unicorn/prefer-spread": "off",
            "unicorn/prefer-event-target": "off",
            "unicorn/better-regex": "off", // doesn't always produce a good alternative
            "unicorn/prefer-string-slice": "off", // Probably good, but most are not fixed
            "unicorn/prefer-reflect-apply": "off", // tbh don't understand the difference
            "unicorn/prefer-top-level-await": "off",
            "unicorn/prefer-negative-index": "off",
            "unicorn/no-unreadable-array-destructuring": "off",
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
        },
    },
    {
        files: ["src/harness/**", "src/testRunner/**"],
        rules: {
            "no-restricted-globals": "off",
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
            "@typescript-eslint/ban-types": "off",
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
