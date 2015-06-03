///<reference path="fourslash.ts"/>

////namespace bar { }
////import bar = bar/**/;

goTo.marker();
verify.quickInfoIs(
`namespace bar
import bar = bar`);