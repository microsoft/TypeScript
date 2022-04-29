/// <reference path="fourslash.ts" />

//// var object: {
////     (bar: any): any;
////     new (bar: any): any;
////     [bar: any]: any;
////     bar: any;
////     foo(bar: any): any;
//// };
////object./**/

verify.completions({
    marker: "",
    includes: [{ name: "bar", text: "(property) bar: any" }, { name: "foo", text: "(method) foo(bar: any): any" }],
});
