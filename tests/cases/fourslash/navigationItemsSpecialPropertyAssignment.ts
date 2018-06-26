/// <reference path="fourslash.ts"/>

// @noLib: true
// @allowJs: true

// @Filename: /a.js
////[|exports.x = 0|];
////[|exports.y = [|function() {}|]|];
////function Cls() {
////    [|this.instanceProp = 0|];
////}
////[|Cls.staticMethod = [|function() {}|]|];
////[|Cls.staticProperty = 0|];
////[|Cls.prototype.instanceMethod = [|function() {}|]|];

const [rX, rY0, rY1, rInstanceProp, rStaticMethod0, rStaticMethod1, rStaticProp, rInstanceMethod0, rInstanceMethod1] = test.ranges();
verify.navigateTo(
    { pattern: "x", expected: [{ name: "x", kind: "const", range: rX }] },
    {
        pattern: "y",
        expected: [
            // TODO: GH#25233
            { name: "y", kind: "function", range: rY0 },
            { name: "y", kind: "function", range: rY1 },
        ],
    },
    {
        pattern: "instanceProp",
        expected: [
            { name: "instanceProp", kind: "property", range: rInstanceProp, containerName: "Cls", containerKind: "function" },
        ],
    },
    {
        pattern: "staticMethod",
        expected: [
            // TODO: GH#25233
            { name: "staticMethod", kind: "method", range: rStaticMethod0 },
            { name: "staticMethod", kind: "function", range: rStaticMethod1 },
        ],
    },
    {
        pattern: "staticProperty",
        expected: [{ name: "staticProperty", kind: "property", range: rStaticProp }],
    },
    {
        pattern: "instanceMethod",
        expected: [
            // TODO: GH#25233
            { name: "instanceMethod", kind: "method", range: rInstanceMethod0 },
            { name: "instanceMethod", kind: "function", range: rInstanceMethod1 },
        ],
    },
);
