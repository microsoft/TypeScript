/// <reference path="fourslash.ts" />

// Ensure kind is set correctly on completions of a generic symbol

////var a = [1,2,3];
////a./**/

verify.completions({
    marker: "",
    includes: [
        {
            name: "length",
            text: "(property) Array<number>.length: number",
            documentation: "Gets or sets the length of the array. This is a number one higher than the highest index in the array.",
            kind: "property",
            kindModifiers: "declare",
        },
        {
            name: "toString",
            text: "(method) Array<number>.toString(): string",
            documentation: "Returns a string representation of an array.",
            kind: "method",
            kindModifiers: "declare",
        },
    ],
});
