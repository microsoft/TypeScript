/// <reference path='fourslash.ts' />

////import * as abs from "abs";

verify.getAndApplyCodeFix();
verify.currentFileContentIs('import * as abs from "abs"');
