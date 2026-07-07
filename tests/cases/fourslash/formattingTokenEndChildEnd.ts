/// <reference path='fourslash.ts' />

/////*start*/type X = { prop: = `${abc}`xyz };
format.document();

goTo.marker("start");
verify.currentLineContentIs("type X = { prop: = `${abc}`xyz };");
