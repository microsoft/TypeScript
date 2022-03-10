///<reference path="fourslash.ts" />

////interface One {
////    commonProperty: number;
////    commonFunction(): number;
////}
////
////interface Two {
////    commonProperty: string
////    commonFunction(): number;
////}
////
////var x : One | Two;
////
////x./**/

verify.completions({
    marker: "",
    exact: [
        { name: "commonFunction", text: "(method) commonFunction(): number" },
        { name: "commonProperty", text: "(property) commonProperty: string | number" },
    ],
});
