/// <reference path="fourslash.ts"/>

// @noLib: true
// @allowJs: true

// @Filename: /a.js
////[|exports.x = 0|];
////[|exports.y = function() {}|];
////function Cls() {
////    [|this.instanceProp = 0|];
////}
////[|Cls.staticMethod = function() {}|];
////[|Cls.staticProperty = 0|];
////[|Cls.prototype.instanceMethod = function() {}|];

const [rX, rY0, rInstanceProp, rStaticMethod, rStaticProp, rInstanceMethod] = test.ranges();
verify.navigateTo(
    { pattern: "x", expected: [{ name: "x", kind: "const", range: rX }] },
    {
        pattern: "y",
        expected: [{ name: "y", kind: "function", range: rY0 }],
    },
    {
        pattern: "instanceProp",
        expected: [
            { name: "instanceProp", kind: "property", range: rInstanceProp, containerName: "Cls", containerKind: "function" },
        ],
    },
    {
        pattern: "staticMethod",
        expected: [{ name: "staticMethod", kind: "method", range: rStaticMethod }],
    },
    {
        pattern: "staticProperty",
        expected: [{ name: "staticProperty", kind: "property", range: rStaticProp }],
    },
    {
        pattern: "instanceMethod",
        expected: [{ name: "instanceMethod", kind: "method", range: rInstanceMethod }],
    },
);
