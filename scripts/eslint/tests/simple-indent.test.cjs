const { RuleTester } = require("./support/RuleTester.cjs");
const rule = require("../rules/simple-indent.cjs");

const ruleTester = new RuleTester({
    parserOptions: {
        warnOnUnsupportedTypeScriptVersion: false,
    },
    parser: require.resolve("@typescript-eslint/parser"),
});

ruleTester.run("simple-indent", rule, {
    valid: [
        {
            code: `
/**
 *			Comment
 */
            `
        },
        {
            code: `
module TestModule {
    var func = () => {
        console.warn("hi");
    };
}
            `,
        },
        {
            code: `
class TestClass {
    private variable;

    testFunction() {
        this.variable = 3;
    }
}
            `,
        },
        {
            code: `
var obj = {
    a: 1,
    b: 2,
    c: 3
};
            `,
        },
        {
            code: `
export enum TestEnum {
    VALUE1,
    VALUE2
}
            `,
        },
        {
            code: `
switch (integerValue) {
    case 1:
        console.warn("1");
        break;
    default:
        console.warn("default");
        break;
}
            `,
        },
        {
            code: `
function loops() {
    for (var i = 0; i < 1; ++i) {
        console.warn(i);
    }

    while (i < 1) {
        console.warn(i);
    }

    do {
        console.warn(i);
    } while (i < 1);

    if (i < 1) {
        console.warn(i);
    } else {
        console.warn(i + 1);
    }
}
            `,
        },
    ],

    invalid: [
        {
            code: `
module TestModule {
\tvar testVariable = 123;
}
            `,
            output: `
module TestModule {
    var testVariable = 123;
}
            `,
            errors: [
                { messageId: "simpleIndentError", line: 3, column: 2 },
            ],
        },
        {
            code: `
function a() {
\t\tvar test = 123;
}
            `,
            output: `
function a() {
        var test = 123;
}
            `,
            errors: [
                { messageId: "simpleIndentError", line: 3, column: 3 },
            ],
        },
        {
            code: `
class TestClass {
\tprivate variable;

\ttestFunction() {
\t\tthis.variable = 3;
\t}
}
            `,
            output: `
class TestClass {
    private variable;

    testFunction() {
        this.variable = 3;
    }
}
            `,
            errors: [
                { messageId: "simpleIndentError", line: 3, column: 2 },
                { messageId: "simpleIndentError", line: 5, column: 2 },
                { messageId: "simpleIndentError", line: 6, column: 3 },
                { messageId: "simpleIndentError", line: 7, column: 2 },
            ],
        },
        {
            code: `
var obj = {
\ta: 1,
\tb: 2,
\tc: 3
};
            `,
            output: `
var obj = {
    a: 1,
    b: 2,
    c: 3
};
            `,
            errors: [
                { messageId: "simpleIndentError", line: 3, column: 2 },
                { messageId: "simpleIndentError", line: 4, column: 2 },
                { messageId: "simpleIndentError", line: 5, column: 2 },
            ]
        },
        {
            code: `
enum TestEnum {
\tVALUE1,
    VALUE2
}
            `,
            output: `
enum TestEnum {
    VALUE1,
    VALUE2
}
            `,
            errors: [
                { messageId: "simpleIndentError", line: 3, column: 2 },
            ],
        },
        {
            code: `
switch (integerValue) {
\tcase 0:
\t\tconsole.warn("1");
\t\tbreak;
    case 1:
        console.warn("1");
        break;
\tdefault:
\t\tconsole.log("2");
\t\tbreak;
}
            `,
            output: `
switch (integerValue) {
    case 0:
        console.warn("1");
        break;
    case 1:
        console.warn("1");
        break;
    default:
        console.log("2");
        break;
}
            `,
            errors: [
                { messageId: "simpleIndentError", line: 3, column: 2 },
                { messageId: "simpleIndentError", line: 4, column: 3 },
                { messageId: "simpleIndentError", line: 5, column: 3 },
                { messageId: "simpleIndentError", line: 9, column: 2 },
                { messageId: "simpleIndentError", line: 10, column: 3 },
                { messageId: "simpleIndentError", line: 11, column: 3 },
            ]
        },
        {
            code: `
for (var i = 0; i < 1; ++i) {
\tconsole.warn("123");
}
            `,
            output: `
for (var i = 0; i < 1; ++i) {
    console.warn("123");
}
            `,
            errors: [
                { messageId: "simpleIndentError", line: 3, column: 2 },
            ],
        },
        {
            code: `
while (i < 1) {
\tconsole.warn("123");
}
            `,
            output: `
while (i < 1) {
    console.warn("123");
}
            `,
            errors: [
                { messageId: "simpleIndentError", line: 3, column: 2 },
            ]
        },
        {
            code: `
do {
\tconsole.warn("123");
} while (i < 1);
            `,
            output: `
do {
    console.warn("123");
} while (i < 1);
            `,
            errors: [
                { messageId: "simpleIndentError", line: 3, column: 2 },
            ]
        },
        {
            code: `
if (i < 1) {
\tconsole.warn("123");
}
            `,
            output: `
if (i < 1) {
    console.warn("123");
}
            `,
            errors: [
                { messageId: "simpleIndentError", line: 3, column: 2 },
            ]
        },
        {
            code: `
var arr = [
\t1,
    2
];
            `,
            output: `
var arr = [
    1,
    2
];
            `,
            errors: [
                { messageId: "simpleIndentError", line: 3, column: 2 },
            ]
        },
        {
            code: `
var arr2 = [
    {
\t\ta: 1,
        b: 2
    },
    {
        a: 3,
\t\tb: 4
    }
];
            `,
            output: `
var arr2 = [
    {
        a: 1,
        b: 2
    },
    {
        a: 3,
        b: 4
    }
];
            `,
            errors: [
                { messageId: "simpleIndentError", line: 4, column: 3 },
                { messageId: "simpleIndentError", line: 9, column: 3 },
            ]
        }
    ],
});
