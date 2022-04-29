/// <reference path="fourslash.ts" />

// @noLib: true

////const [|{| "name": "c", "kind": "const" |}c = 10|];
////function foo() {
////    const [|{| "name": "d", "kind": "const", "containerName": "foo", "containerKind": "function" |}d = 10|];
////}

for (const range of test.ranges()) {
    verify.navigateTo({
        pattern: range.marker.data.name,
        expected: [{ ...range.marker.data, range }],
    })
}
