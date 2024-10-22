/// <reference path="fourslash.ts" />

////interface Foo {
////    a: number;
////    b: string;
////    c: 1;
////    d: "d";
////    e: "e1" | "e2";
////    f(x: number, y: number): void;
////    g: (x: number, y: number) => void;
////    h: number[];
////    i: bigint;
////    j: undefined | "special-string";
////    k: `--${string}`;
////}
////[|const b = {} satisfies Foo;|]

verify.codeFix({
    index: 0,
    description: ts.Diagnostics.Add_missing_properties.message,
    newRangeContent:
`const b = {
    a: 0,
    b: "",
    c: 1,
    d: "d",
    e: "e1",
    f: function(x: number, y: number): void {
        throw new Error("Function not implemented.");
    },
    g: function(x: number, y: number): void {
        throw new Error("Function not implemented.");
    },
    h: [],
    i: 0n,
    j: "special-string",
    k: ""
} satisfies Foo;`,
});
