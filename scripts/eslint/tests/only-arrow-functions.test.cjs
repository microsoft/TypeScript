const { RuleTester } = require("./support/RuleTester.cjs");
const rule = require("../rules/only-arrow-functions.cjs");

const ruleTester = new RuleTester({
    languageOptions: {
        parserOptions: {
            warnOnUnsupportedTypeScriptVersion: false,
        },
    },
});

ruleTester.run("only-arrow-functions", rule, {
    valid: [
        {
            code: `const a = () => {};`,
        },
        {
            code: `((func) => func())(() => {});`,
        },
        {
            code: `function* generator() {}`,
        },
        {
            code: `let generator = function*() {}`,
        },
        {
            code: `function hasThisParameter(this) {}`,
        },
        {
            code: `let hasThisParameter = function(this) {}`,
        },
        {
            code: `let usesThis = function() { this; }`,
        },
        {
            code: `let usesThis2 = function(foo = this) {}`,
        },
        {
            code: `
let fn = function fn() {};
function z() {};
            `,
            options: [{ allowNamedFunctions: true }],
        },
        {
            code: `
function fn() {};
let generator = function*() {}
function hasThisParameter(this) {}
let hasThisParameter = function(this) {}
            `,
            options: [{ allowDeclarations: true }],
        },
        {
            code: `
class A {
    test() {}
}
        `,
        },
        {
            code: `
const obj = {
    test() {}
}
            `,
        },
    ],

    invalid: [
        {
            code: `function foo(a: any): any {}`,
            errors: [{ messageId: "onlyArrowFunctionsError" }],
        },
        {
            code: `let b = function () {};`,
            errors: [{ messageId: "onlyArrowFunctionsError" }],
        },
        {
            code: `function c() {}`,
            errors: [{ messageId: "onlyArrowFunctionsError" }],
        },
        {
            code: `((func) => func())(function e(): void {});`,
            errors: [{ messageId: "onlyArrowFunctionsError" }],
        },
        {
            code: `
let notUsesThis = function() {
    function f() { this; }
}
            `,
            errors: [{ messageId: "onlyArrowFunctionsError" }],
        },
        {
            code: `
let notUsesThis2 = function() {
    return class { method() { this; } }
}
            `,
            errors: [{ messageId: "onlyArrowFunctionsError" }],
        },
        {
            code: `export function exported() {}`,
            errors: [{ messageId: "onlyArrowFunctionsError" }],
        },
        {
            code: `async function asyncFunction() {}`,
            errors: [{ messageId: "onlyArrowFunctionsError" }],
        },
        {
            code: `
let b = function () {};
((func) => func())(function e(): void {});
            `,
            options: [{ allowDeclarations: true }],
            errors: [
                { messageId: "onlyArrowFunctionsError" },
                { messageId: "onlyArrowFunctionsError" },
            ],
        },
        {
            code: `const x = function() {}`,
            options: [{ allowNamedFunctions: true }],
            errors: [{ messageId: "onlyArrowFunctionsError" }],
        },
    ],
});
