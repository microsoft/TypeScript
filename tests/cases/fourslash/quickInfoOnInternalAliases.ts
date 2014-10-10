/// <reference path='fourslash.ts' />

/////** Module comment*/
////export module m1 {
////    /** m2 comments*/
////    export module m2 {
////        /** class comment;*/
////        export class /*1*/c {
////        };
////    }
////}
/////**This is on import declaration*/
////import /*2*/internalAlias = m1.m2./*3*/c;
////var /*4*/newVar = new /*5*/internalAlias();
////var /*6*/anotherAliasVar = /*7*/internalAlias;


goTo.marker('1');
verify.quickInfoIs("class m1.m2.c", "class comment;");

goTo.marker('2');
verify.quickInfoIs('import internalAlias = m1.m2.c', "This is on import declaration");

goTo.marker('3');
verify.quickInfoIs("class m1.m2.c", "class comment;");

goTo.marker('4');
verify.quickInfoIs("(var) newVar: internalAlias", "");

goTo.marker('5');
verify.quickInfoIs("import internalAlias = m1.m2.c", "This is on import declaration");

goTo.marker('6');
verify.quickInfoIs("(var) anotherAliasVar: typeof internalAlias", "");

goTo.marker('7');
verify.quickInfoIs("import internalAlias = m1.m2.c", "This is on import declaration");