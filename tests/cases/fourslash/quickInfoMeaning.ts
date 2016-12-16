///<reference path="fourslash.ts" />

// Testing that quickInfo gets information with a corresponding meaning: values to values, types to types.
// For quick info purposes, we don't resolve past aliases.
// However, when we have an alias for a type, the quickInfo for a value with the same should skip the alias, and vice versa.
// goToDefinition should work the same way.

// @Filename: foo.d.ts
////declare const /*foo_value_declaration*/foo: number;
////declare module "foo_module" {
////    interface I { x: number; y: number }
////    export = I;
////}

// @Filename: foo_user.ts
///////<reference path="foo.d.ts" />
/////*foo_type_declaration*/import foo = require("foo_module");
////const x = foo/*foo_value*/;
////const i: foo/*foo_type*/ = { x: 1, y: 2 };

verify.numberOfErrorsInCurrentFile(0);

verify.navigationItemsListCount(2, "foo", "exact");
verify.navigationItemsListContains("foo", "alias", "foo", "exact");
verify.navigationItemsListContains("foo", "const", "foo", "exact");

goTo.marker("foo_value");
verify.quickInfoIs("const foo: number");
verify.goToDefinitionIs("foo_value_declaration");

goTo.marker("foo_type");
verify.quickInfoIs("import foo = require(\"foo_module\")");
verify.goToDefinitionIs("foo_type_declaration");


// Above tested for global const and imported interface. Now test with global interface and imported const.


// @Filename: bar.d.ts
/////*bar_type_declaration*/declare interface bar { x: number; y: number }
////declare module "bar_module" {
////    const x: number;
////    export = x;
////}

// @Filename: bar_user.ts
///////<reference path="bar.d.ts" />
/////*bar_value_declaration*/import bar = require("bar_module");
////const x = bar/*bar_value*/;
////const i: bar/*bar_type*/ = { x: 1, y: 2 };

verify.numberOfErrorsInCurrentFile(0);
verify.navigationItemsListCount(2, "bar", "exact");
verify.navigationItemsListContains("bar", "alias", "bar", "exact");
verify.navigationItemsListContains("bar", "interface", "bar", "exact");

goTo.marker("bar_value");
verify.quickInfoIs("import bar = require(\"bar_module\")");
verify.goToDefinitionIs("bar_value_declaration");

goTo.marker("bar_type");
verify.quickInfoIs("interface bar");
verify.goToDefinitionIs("bar_type_declaration");
