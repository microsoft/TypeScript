/// <reference path="fourslash.ts" />

////type T = `${"prefix1"|"prefix2"}${string}`;
////let x: T = "/**/;


verify.completions({
    marker: "",
    unsorted: ["prefix1", "prefix2"]
});
