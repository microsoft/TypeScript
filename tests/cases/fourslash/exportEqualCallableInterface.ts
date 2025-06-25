/// <reference path='fourslash.ts'/>

// @Filename: exportEqualCallableInterface_file0.ts
////interface x {
////    (): Date;
////    foo: string;
////}
////export = x;

// @Filename: exportEqualCallableInterface_file1.ts
///////<reference path='exportEqualCallableInterface_file0.ts'/>
////import test = require('./exportEqualCallableInterface_file0');
////var t2: test;
////t2./**/

verify.completions({
    marker: "",
    includes: [
        { name: "foo", sortText: "11" },      // LocationPriority (custom property)
        { name: "apply", sortText: "111" },   // SortBelow(LocationPriority) (native)
        { name: "call", sortText: "111" },    // SortBelow(LocationPriority) (native)
        { name: "bind", sortText: "111" },    // SortBelow(LocationPriority) (native)
        { name: "toString", sortText: "111" }, // SortBelow(LocationPriority) (native)
        { name: "length", sortText: "111" },  // SortBelow(LocationPriority) (native)
        { name: "prototype", sortText: "111" }, // SortBelow(LocationPriority) (native)
    ]
});
