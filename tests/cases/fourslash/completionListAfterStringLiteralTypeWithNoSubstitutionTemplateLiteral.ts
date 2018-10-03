/// <reference path="fourslash.ts" />

////let count: 'one' | 'two';
////count = `/**/`

goTo.marker();
verify.completionListContains('one');
verify.completionListContains('two');
