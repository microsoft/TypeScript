/// <reference path="fourslash.ts" />

// @noLib: true

////export { [|{| "name": "a", "kind": "alias" |}a|] }  from "a";
////
////export { [|{| "name": "B", "kind": "alias" |}b as B|] }  from "a";
////
////export { [|{| "name": "c", "kind": "alias" |}c|],
////            [|{| "name": "D", "kind": "alias" |}d as D|] }  from "a";
////
////[|{| "name": "f", "kind": "alias", "kindModifiers": "export" |}export import f = require("a");|]

for (const range of test.ranges()) {
    verify.navigateTo({
        pattern: range.marker.data.name,
        expected: [{ ...range.marker.data, range }],
    });
}
