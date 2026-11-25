import eslint from "@eslint/js";
import regexpPlugin from "eslint-plugin-regexp";
import globals from "globals";
import fs from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import tseslint from "typescript-eslint";

const require = createRequire(import.meta.url);
const rulesDir = path.join(import.meta.dirname, "packages/typescript/eslint/rules");
const rules = Object.fromEntries(
    fs.readdirSync(rulesDir)
        .filter(file => (file.endsWith(".cjs") && file !== "utils.cjs") || file === "public-api-types.ts")
        .map(file => [file.replace(/\.(cjs|ts)$/, ""), file.endsWith(".ts") ? require(path.join(rulesDir, file)).default : require(path.join(rulesDir, file))]),
);
const localPlugin = { rules };
const packageExports = JSON.parse(fs.readFileSync(new URL("./packages/typescript/package.json", import.meta.url), "utf8")).exports;
export const publicSourceEntrypoints = Object.values(packageExports)
    .filter(value => typeof value === "object" && value["@typescript/source"])
    .map(value => `packages/typescript/${value["@typescript/source"].replace(/^\.\//, "")}`);
const publicAPIEntrypoints = publicSourceEntrypoints.map(file => path.resolve(import.meta.dirname, file));
const generatedIgnores = [
    "packages/typescript/**/*.generated.ts",
    "packages/typescript/src/api/sync/api.ts",
    "packages/typescript/src/api/sync/types.ts",
];

export default tseslint.config(
    {
        ignores: [
            "**/node_modules/**",
            "packages/typescript/dist/**",
            "packages/typescript/vendor/**",
            ...generatedIgnores,
            ...publicSourceEntrypoints.map(file => `!${file}`),
            "packages/typescript/test/sync/api.bench.ts",
            "packages/typescript/test/sync/api.test.ts",
            "packages/typescript/test/sync/astnav.test.ts",
            "packages/typescript/test/generators/api.bench.ts",
        ],
    },
    {
        files: publicSourceEntrypoints,
        plugins: { local: localPlugin },
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                projectService: { EXPERIMENTAL_backend: "tsgo" },
                tsconfigRootDir: import.meta.dirname,
            },
        },
        rules: { "local/public-api-types": ["error", { entrypoints: publicAPIEntrypoints }] },
    },
    {
        files: ["packages/typescript/src/api/async/api.ts"],
        rules: { "local/public-api-types": ["error", { entrypoints: publicAPIEntrypoints, sameEntrypoint: ["CompilerOptions"] }] },
    },
    {
        files: generatedIgnores,
        linterOptions: { reportUnusedDisableDirectives: "off" },
    },
    {
        files: ["packages/typescript/{src,test,scripts}/**/*.ts", "packages/typescript/eslint/rules/**/*.ts"],
        ignores: generatedIgnores,
        extends: [
            eslint.configs.recommended,
            ...tseslint.configs.recommended,
            ...tseslint.configs.stylistic,
            regexpPlugin.configs["flat/recommended"],
        ],
        plugins: { local: localPlugin },
        languageOptions: {
            globals: globals.node,
            parserOptions: {
                projectService: { EXPERIMENTAL_backend: "tsgo" },
                tsconfigRootDir: import.meta.dirname,
            },
        },
        rules: {
            "dot-notation": "off",
            "eqeqeq": "off", // Enforced below with an exception for nullish comparisons.
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
                { selector: "Literal[raw=null]", message: "Avoid using null; use undefined instead." },
                { selector: "TSNullKeyword", message: "Avoid using null; use undefined instead." },
                {
                    selector: "BinaryExpression[operator=/^(==|!=)$/]:not([left.type='Identifier'][left.name='undefined']):not([right.type='Identifier'][right.name='undefined'])",
                    message: "Expected strict equality unless comparing with undefined.",
                },
            ],
            "no-extra-boolean-cast": "off",
            "no-case-declarations": "off",
            "no-cond-assign": "off",
            "no-control-regex": "off",
            "no-inner-declarations": "off",
            "@typescript-eslint/naming-convention": [
                "error",
                { selector: "typeLike", format: ["PascalCase"], leadingUnderscore: "allow", filter: { regex: "^(__String|[A-Za-z]+_[A-Za-z]+)$", match: false } },
                { selector: "interface", format: ["PascalCase"], custom: { regex: "^I[A-Z]", match: false }, filter: { regex: "^I(Arguments|TextWriter|O([A-Z][a-z]+[A-Za-z]*)?)$", match: false } },
                { selector: "variable", format: ["camelCase", "PascalCase", "UPPER_CASE"], leadingUnderscore: "allow", filter: { regex: "^(_{1,2}filename|_{1,2}dirname|_+|[A-Za-z]+_[A-Za-z]+)$", match: false } },
                { selector: "function", format: ["camelCase", "PascalCase"], leadingUnderscore: "allow", filter: { regex: "^[A-Za-z]+_[A-Za-z]+$", match: false } },
                { selector: "parameter", format: ["camelCase"], leadingUnderscore: "allow", filter: { regex: "^(_+|[A-Za-z]+_[A-Z][a-z]+)$", match: false } },
                { selector: "method", format: ["camelCase", "PascalCase"], leadingUnderscore: "allow", filter: { regex: "^([0-9]+|[A-Za-z]+(?:_[A-Za-z]+)+)$", match: false } },
                { selector: "memberLike", format: ["camelCase"], leadingUnderscore: "allow", filter: { regex: "^([0-9]+|[A-Za-z]+(?:_[A-Za-z]+)+)$", match: false } },
                { selector: "enumMember", format: ["camelCase", "PascalCase"], leadingUnderscore: "allow", filter: { regex: "^[A-Za-z]+_[A-Za-z]+$", match: false } },
                { selector: "property", format: null },
            ],
            "@typescript-eslint/unified-signatures": "error",
            "@typescript-eslint/dot-notation": ["error", {
                allowIndexSignaturePropertyAccess: true,
                allowPrivateClassPropertyAccess: true,
                allowProtectedClassPropertyAccess: true,
            }],
            "no-unused-expressions": "off",
            "@typescript-eslint/no-unused-expressions": ["error", { allowTernary: true }],
            "@typescript-eslint/ban-ts-comment": "off",
            "@typescript-eslint/class-literal-property-style": "off",
            "@typescript-eslint/consistent-indexed-object-style": "off",
            "@typescript-eslint/consistent-generic-constructors": "off",
            "@typescript-eslint/no-duplicate-enum-values": "off",
            "@typescript-eslint/no-empty-function": "off",
            "@typescript-eslint/no-namespace": "off",
            "@typescript-eslint/no-non-null-asserted-optional-chain": "off",
            "@typescript-eslint/no-empty-object-type": "off",
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-require-imports": "off",
            "@typescript-eslint/no-unused-vars": [
                "error",
                { argsIgnorePattern: "^(_+$|_[^_])", varsIgnorePattern: "^(_+$|_[^_])" },
            ],
            "@typescript-eslint/no-inferrable-types": "off",
            "@typescript-eslint/prefer-optional-chain": "off",
            "@typescript-eslint/no-unnecessary-type-assertion": "error",
            "local/only-arrow-functions": ["error", { allowNamedFunctions: true, allowDeclarations: true }],
            "local/argument-trivia": "error",
            "local/no-in-operator": "error",
            "local/debug-assert": "error",
            "local/no-keywords": "error",
            "local/jsdoc-format": "error",
            "local/js-extensions": "error",
            "local/no-array-mutating-method-expressions": "error",
        },
    },
);
