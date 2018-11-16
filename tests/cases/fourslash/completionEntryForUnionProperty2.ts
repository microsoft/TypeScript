///<reference path="fourslash.ts" />

////interface One {
////    commonProperty: string;
////    commonFunction(): number;
////}
////
////interface Two {
////    commonProperty: number;
////    commonFunction(): number;
////}
////
////var x : One | Two;
////
////x.commonProperty./**/

verify.completions({
    marker: "",
    exact: [
        { name: "toString", text: "(method) toString(): string", documentation: "Returns a string representation of a string.", },
        { name: "valueOf", text: "(method) valueOf(): string | number", documentation: "Returns the primitive value of the specified object." },
    ],
});
