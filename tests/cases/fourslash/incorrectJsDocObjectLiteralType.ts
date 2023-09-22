///<reference path="fourslash.ts" />

// @Filename: /a.ts
////

verify.navigateTo({ pattern: "", fileName: "/a.ts", expected: [] });
edit.insert("/**\n * @typedef {Object} foo\n * @property {any} [obj]\n */\nexport default function foo() {\n}");
verify.navigateTo({
    pattern: "foo",
    expected: [
        {
            name: "foo",
            kind: "function",
            kindModifiers: "export",
            range: { fileName: "/a.ts", pos: 58, end: 91 },
        },
    ],
});
