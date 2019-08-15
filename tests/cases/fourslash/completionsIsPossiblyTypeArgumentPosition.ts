/// <reference path="fourslash.ts" />

////const x = 0;
////type T = number;
////function f(x: number) {}
////function g<T>(x: T) {}
////class C<T> {}

////x + {| "valueOnly": true |}
////x < {| "valueOnly": true |}
////f < {| "valueOnly": true |}
////g < /*g*/
////const something: C</*something*/;
////const something2: C<C</*something2*/;
////new C</*C*/;
////new C<C</*CC*/;
////
////declare const callAndConstruct: { new<T>(): callAndConstruct<T>; <T>(): string; };
////interface callAndConstruct<T> {}
////new callAndConstruct<callAndConstruct</*callAndConstruct*/

for (const marker of test.markers()) {
    if (marker.data && marker.data.valueOnly) {
        verify.completions({ marker, includes: "x", excludes: "T" });
    }
    else {
        verify.completions({ marker, includes: "T", excludes: "x" });
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
