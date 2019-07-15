/// <reference path="fourslash.ts" />

////const x = 0;
////type T = number;
////function f(x: number) {}
////function g<T>(x: T) {}
////class C<T> {}

////x + {| "valueOnly": true |}
////x < {| "valueOnly": true |}
////f < {| "valueOnly": true |}
////g < {| "valueOnly": false |}
////const something: C<{| "typeOnly": true |};
////const something2: C<C<{| "typeOnly": true |};
////new C<{| "valueOnly": false |};
////new C<C<{| "valueOnly": false |};
////
////declare const callAndConstruct: { new<T>(): callAndConstruct<T>; <T>(): string; };
////interface callAndConstruct<T> {}
////new callAndConstruct<callAndConstruct</*callAndConstruct*/

for (const marker of test.markers()) {
    if (marker.data && marker.data.typeOnly) {
        verify.completions({ marker, includes: "T", excludes: "x" });
    }
    else if (marker.data && marker.data.valueOnly) {
        verify.completions({ marker, includes: "x", excludes: "T" });
    }
    else {
        verify.completions({ marker, includes: ["x", "T"] });
    }
}

verify.signatureHelp({
    marker: "callAndConstruct",
    text: "callAndConstruct<T>(): string",
    parameterName: "T",
    parameterSpan: "T",
    parameterCount: 1,
    argumentCount: 1,
});
