/// <reference path='fourslash.ts' />

/////** Module comment*/
////export module m1 {
////    /** m2 comments*/
////    export module m2 {
////        /** class comment;*/
////        export class /*1*/c {
////        };
////    }
////    export function foo() {
////    }
////}
/////**This is on import declaration*/
////import /*2*/internalAlias = m1.m2./*3*/c;
////var /*4*/newVar = new /*5*/internalAlias();
////var /*6*/anotherAliasVar = /*7*/internalAlias;
////import /*8*/internalFoo = m1./*9*/foo;
////var /*10*/callVar = /*11*/internalFoo();
////var /*12*/anotherAliasFoo = /*13*/internalFoo;

goTo.marker('1');
verify.quickInfoIs("class m1.m2.c", "class comment;");

goTo.marker('2');
verify.quickInfoIs('import internalAlias = m1.m2.c', "This is on import declaration");

goTo.marker('3');
verify.quickInfoIs("class m1.m2.c", "class comment;");

goTo.marker('4');
verify.quickInfoIs("(var) newVar: internalAlias", "");

goTo.marker('5');
verify.quickInfoIs("(alias) new internalAlias(): internalAlias\nimport internalAlias = m1.m2.c", "");

goTo.marker('6');
verify.quickInfoIs("(var) anotherAliasVar: typeof internalAlias", "");

goTo.marker('7');
verify.quickInfoIs("import internalAlias = m1.m2.c", "This is on import declaration");

goTo.marker('8');
verify.quickInfoIs('import internalFoo = m1.foo', "");

goTo.marker('9');
verify.quickInfoIs("(function) m1.foo(): void", "");

goTo.marker('10');
verify.quickInfoIs("(var) callVar: void", "");

goTo.marker('11');
verify.quickInfoIs("(alias) internalFoo(): void\nimport internalFoo = m1.foo", "");

goTo.marker('12');
verify.quickInfoIs("(var) anotherAliasFoo: () => void", "");

goTo.marker('13');
verify.quickInfoIs("import internalFoo = m1.foo", "");