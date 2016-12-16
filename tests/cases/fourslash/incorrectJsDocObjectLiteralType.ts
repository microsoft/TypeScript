///<reference path="fourslash.ts" />

//// /**/

goTo.marker();
verify.navigationItemsListCount(0, "foo", "exact");
edit.insert("/**\n * @typedef {Object} foo\n * @property {any} [obj]\n */\nexport default function foo() {\n}");
verify.navigationItemsListContains("foo", "function", "foo", "exact");
