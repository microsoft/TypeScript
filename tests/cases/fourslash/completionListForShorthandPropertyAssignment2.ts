/// <reference path="fourslash.ts" />

//// var person: {name:string; id: number} = { n/**/

goTo.marker();
verify.completionListContains('name');
verify.completionListContains('id');