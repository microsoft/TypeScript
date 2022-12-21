/// <reference path='fourslash.ts' />

////export let Console = 1;
////export let console = 1;
////[|conole|] = 1;

verify.rangeAfterCodeFix('console');
