/// <reference path="fourslash.ts"/>

// @noLib: true

////[|{| "name": "C", "kind": "class" |}class C {
////    [|{| "name": "foo", "kind": "method", "containerName": "C", "containerKind": "class" |}foo() { }|]
////    ["hi" + "bye"]() { }
////    [|{| "name": "bar", "kind": "method", "containerName": "C", "containerKind": "class" |}bar() { }|]
////}|]

for (const range of test.ranges()) {
    verify.navigateTo({
        pattern: range.marker.data.name,
        expected: [{ ...range.marker.data, range }],
    });
}
