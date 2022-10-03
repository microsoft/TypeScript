/// <reference path="fourslash.ts" />

// @noLib: true

////import [|{| "name": "ns", "kind": "alias" |}* as ns|] from "a";
////
////import { [|{| "name": "a", "kind": "alias" |}a|] }  from "a";
////
////import { [|{| "name": "B", "kind": "alias" |}b as B|] }  from "a";
////
////import { [|{| "name": "c", "kind": "alias" |}c|],
////            [|{| "name": "dee", "kind": "alias" |}d as dee|] }  from "a";
////
////import [|{| "name": "d1", "kind": "alias" |}d1|], {
////            [|{| "name": "e", "kind": "alias" |}e|] }  from "a";
////
////[|{| "name": "f", "kind": "alias" |}import f = require("a");|]

// TODO: GH#25237 (range for `d1` is too big)

for (const range of test.ranges()) {
    verify.navigateTo({
        pattern: range.marker.data.name,
        expected: [{ ...range.marker.data, range }],
    });
}
