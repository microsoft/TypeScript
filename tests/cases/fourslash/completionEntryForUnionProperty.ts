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
        { name: "commonProperty", text: "(property) commonProperty: string | number" },
        { name: "commonFunction", text: "(method) commonFunction(): number" },
    ],
});
