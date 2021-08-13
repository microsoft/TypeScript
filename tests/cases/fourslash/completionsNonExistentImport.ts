/// <reference path="fourslash.ts" />

////import { NonExistentType } from "non-existent-module";
////let foo: /**/

verify.completions({
    marker: "",
    includes: ["NonExistentType"]
});
