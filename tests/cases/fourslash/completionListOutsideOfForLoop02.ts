/// <reference path='fourslash.ts' />

////for (let i = 0; i < 10; i++);/*1*/

verify.completions({ marker: "1", excludes: "i" });
