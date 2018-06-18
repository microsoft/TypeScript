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
////const something: C<{| "valueOnly": false |};
////const something2: C<C<{| "valueOnly": false |};
////new C<{| "valueOnly": false |};
////new C<C<{| "valueOnly": false |};

for (const marker of test.markers()) {
    if (marker.data.valueOnly) {
        verify.completions({ marker, includes: "x", excludes: "T" });
    }
    else {
        verify.completions({ marker, includes: ["x", "T"] });
    }
}
