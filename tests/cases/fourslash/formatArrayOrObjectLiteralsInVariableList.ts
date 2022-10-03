/// <reference path='fourslash.ts' />

////var v30 = [1, 2], v31, v32, v33 = [0], v34 = {'a': true}, v35;/**/

format.document();
goTo.marker("");
verify.currentLineContentIs("var v30 = [1, 2], v31, v32, v33 = [0], v34 = { 'a': true }, v35;");