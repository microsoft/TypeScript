///<reference path="fourslash.ts"/>

////namespace bar { }
////import bar = bar/**/;

verify.quickInfoAt("",
`namespace bar
import bar = bar`);
