/// <reference path="fourslash.ts" />

////var ccc: number;
////var ddd: string;

////var aaa: number;
////var bbb: string;
/////*1*/

const check = () => verify.completions({
    includes: [
        { name: "aaa", text: "var aaa: number" },
        { name: "bbb", text: "var bbb: string" },
        { name: "ccc", text: "var ccc: number" },
        { name: "ddd", text: "var ddd: string" },
    ],
});

goTo.marker("1");

// Checking for completion details before edit should work
check();

// Make an edit
edit.insert("a");
edit.backspace();

// Checking for completion details after edit should work too
check();
