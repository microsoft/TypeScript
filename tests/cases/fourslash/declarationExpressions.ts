/// <reference path="fourslash.ts"/>

// @noLib: true

////[|{| "name": "A", "kind": "class" |}class A {}|]
////const [|{| "name": "B", "kind": "const" |}B = [|{| "name": "Cz", "kind": "class" |}class Cz {
////    public x;
////}|]|];
////[|{| "name": "D", "kind": "function" |}function D() {}|]
////const [|{| "name": "E", "kind": "const" |}E = [|{| "name": "F", "kind": "function" |}function F() {}|]|]
////console.log(function() {}, class {}); // Expression with no name should have no effect.
////console.log([|{| "name": "inner", "kind": "function" |}function inner() {}|]);
////String([|{| "name": "nn", "kind": "function" |}function nn() {
////	[|{| "name": "cls", "kind": "class", "containerName": "nn", "containerKind": "function" |}class cls {
////		[|{| "name": "prop", "kind": "property", "kindModifiers": "public", "containerName": "cls", "containerKind": "class" |}public prop;|]
////	}|]
////}|]));

for (const range of test.ranges()) {
	verify.navigateTo({ pattern: range.marker.data.name, expected: [{ ...range.marker.data, range }] });
}
