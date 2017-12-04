/// <reference path="fourslash.ts"/>

// @allowJs: true
// @Filename: /a.js
////exports.{| "name": "x", "kind": "const" |}x = 0;
////exports.{| "name": "y", "kind": "function" |}y = function() {};
////function Cls() {
////    this.{| "name": "prop", "kind": "property" |}prop = 0;
////}
////Cls.{| "name": "staticMethod", "kind": "method" |}staticMethod = function() {};
////Cls.{| "name": "staticProperty", "kind": "property" |}staticProperty = 0;
////Cls.prototype.{| "name": "instance", "kind": "method" |}instance = function() {};

for (const marker of test.markers()) {
    verify.navigationItemsListContains(
        marker.data.name,
        marker.data.kind,
        marker.data.name,
        "exact");
}
