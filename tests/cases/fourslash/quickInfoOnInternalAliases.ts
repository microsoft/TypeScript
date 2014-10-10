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

goTo.marker('1');
verify.quickInfoIs("class m1.m2.c", "class comment;");

goTo.marker('2');
verify.quickInfoIs('(alias) internalAlias', "This is on import declaration");

goTo.marker('3');
verify.quickInfoIs("class m1.m2.c", "class comment;");