///<reference path="fourslash.ts" />

// Testing that quickInfo gets information with a corresponding meaning: values to values, types to types.
// For quick info purposes, we don't resolve past aliases.
// However, when we have an alias for a type, the quickInfo for a value with the same should skip the alias, and vice versa.
// goToDefinition should work the same way.

// @Filename: foo.d.ts
////declare const [|/*foo_value_declaration*/foo: number|];
////[|declare module "foo_module" {
////    interface /*foo_type_declaration*/I { x: number; y: number }
////    export = I;
////}|]

// @Filename: foo_user.ts
///////<reference path="foo.d.ts" />
////[|import foo = require("foo_module");|]
////const x = foo/*foo_value*/;
////const i: foo/*foo_type*/ = { x: 1, y: 2 };

verify.noErrors();

const [r0, r1, r2] = test.ranges();
verify.navigateTo({
    pattern: "foo",
    expected: [
        { name: "foo", kind: "const", kindModifiers: "declare", range: r0 },
        { name: "foo", kind: "alias", range: r2 },
        { name: "foo_module", matchKind: "prefix", kind: "module", kindModifiers: "declare", range: r1 },
    ],
});

goTo.marker("foo_value");
verify.quickInfoIs("const foo: number");

goTo.marker("foo_type");
verify.quickInfoIs("(alias) interface foo\nimport foo = require(\"foo_module\")");


// Above tested for global const and imported interface. Now test with global interface and imported const.


// @Filename: bar.d.ts
////[|declare interface /*bar_type_declaration*/bar { x: number; y: number }|]
////[|declare module "bar_module" {
////    const /*bar_value_declaration*/x: number;
////    export = x;
////}|]

// @Filename: bar_user.ts
///////<reference path="bar.d.ts" />
////[|import bar = require("bar_module");|]
////const x = bar/*bar_value*/;
////const i: bar/*bar_type*/ = { x: 1, y: 2 };

const [ , , , r3, r4, r5] = test.ranges();

verify.navigateTo({
    pattern: "bar",
    expected: [
        { name: "bar", kind: "interface", kindModifiers: "declare", range: r3 },
        { name: "bar", kind: "alias", range: r5 },
        { name: "bar_module", matchKind: "prefix", kind: "module", kindModifiers: "declare", range: r4 },
    ],
});

goTo.marker("bar_value");
verify.quickInfoIs("(alias) const bar: number\nimport bar = require(\"bar_module\")");

goTo.marker("bar_type");
verify.quickInfoIs("interface bar");

verify.baselineGetDefinitionAtPosition("foo_value", "foo_type", "bar_value", "bar_type");
