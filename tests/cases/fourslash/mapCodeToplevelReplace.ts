///<reference path="fourslash.ts"/>

// @Filename: /index.ts
//// function foo() {
////     return 1;
//// }
//// function bar() {
////     return 2;
//// }
verify.mapCode({
    "index.ts": `function foo() {\n    return 3;\n}\nfunction bar() {\n    return 2;\n}\n`
}, [
    {
        fileName: "index.ts",
        focusLocations: [[{ start: 0, end: 1}]],
        contents: ["function foo() {\n    return 3;\n}"]
    },
]);
