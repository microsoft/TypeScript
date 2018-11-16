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

verify.quickInfos({
    1: ["class m1.m2.c", "class comment;"],
    2: ["(alias) class internalAlias\nimport internalAlias = m1.m2.c", "This is on import declaration"],
    3: ["class m1.m2.c", "class comment;"],
    4: "var newVar: internalAlias",
    5: ["(alias) new internalAlias(): internalAlias\nimport internalAlias = m1.m2.c", "This is on import declaration"],
    6: "var anotherAliasVar: typeof internalAlias",
    7: ["(alias) class internalAlias\nimport internalAlias = m1.m2.c", "This is on import declaration"],
    8: "(alias) function internalFoo(): void\nimport internalFoo = m1.foo",
    9: "function m1.foo(): void",
    10: "var callVar: void",
    11: "(alias) internalFoo(): void\nimport internalFoo = m1.foo",
    12: "var anotherAliasFoo: () => void",
    13: "(alias) function internalFoo(): void\nimport internalFoo = m1.foo"
});
