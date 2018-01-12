/// <reference path='fourslash.ts' />

////var o1 : {
////    __proto__: number;
////    p: number;
////} = {
////        /*1*/
////    };
////var o2: {
////    __proto__: number;
////    p: number;
////} = {
////        /*2*/
////    };
////var o3: {
////    "__proto__": number;
////    p: number;
////} = {
////        /*3*/
////    };
////var o4: {
////    "__proto__": number;
////    p: number;
////} = {
////        /*4*/
////    };
////var o5: {
////    __proto__: number;
////    ___proto__: string;
////    p: number;
////} = {
////        /*5*/
////    };
////var o6: {
////    __proto__: number;
////    ___proto__: string;
////    p: number;
////} = {
////        /*6*/
////    };

goTo.marker('1');
verify.completionListContains("__proto__", '(property) __proto__: number');
verify.completionListContains("p", '(property) p: number');
edit.insert('__proto__: 10,');
verify.not.completionListContains("__proto__", '(property) __proto__: number');
verify.completionListContains("p", '(property) p: number');

goTo.marker('2');
verify.completionListContains("__proto__", '(property) __proto__: number');
verify.completionListContains("p", '(property) p: number');
edit.insert('"__proto__": 10,');
verify.not.completionListContains("__proto__", '(property) __proto__: number');
verify.completionListContains("p", '(property) p: number');

goTo.marker('3');
verify.completionListContains("__proto__", '(property) "__proto__": number');
verify.completionListContains("p", '(property) p: number');
edit.insert('__proto__: 10,');
verify.not.completionListContains("__proto__", '(property) "__proto__": number');
verify.completionListContains("p", '(property) p: number');

goTo.marker('4');
verify.completionListContains("__proto__", '(property) "__proto__": number');
verify.completionListContains("p", '(property) p: number');
edit.insert('"__proto__": 10,');
verify.not.completionListContains("__proto__", '(property) "__proto__": number');
verify.completionListContains("p", '(property) p: number');

goTo.marker('5');
verify.completionListContains("___proto__", '(property) ___proto__: string');
verify.completionListContains("__proto__", '(property) __proto__: number');
verify.completionListContains("p", '(property) p: number');
edit.insert('__proto__: 10,');
verify.not.completionListContains("__proto__", '(property) __proto__: number');
verify.completionListContains("___proto__", '(property) ___proto__: string');
verify.completionListContains("p", '(property) p: number');
edit.insert('"___proto__": "10",');
verify.not.completionListContains("__proto__", '(property) __proto__: number');
verify.not.completionListContains("___proto__", '(property) ___proto__: string');
verify.completionListContains("p", '(property) p: number');

goTo.marker('6');
verify.completionListContains("___proto__", '(property) ___proto__: string');
verify.completionListContains("__proto__", '(property) __proto__: number');
verify.completionListContains("p", '(property) p: number');
edit.insert('___proto__: "10",');
verify.completionListContains("__proto__", '(property) __proto__: number');
verify.not.completionListContains("___proto__", '(property) ___proto__: string');
verify.completionListContains("p", '(property) p: number');
edit.insert('"__proto__": 10,');
verify.not.completionListContains("__proto__", '(property) __proto__: number');
verify.not.completionListContains("___proto__", '(property) ___proto__: string');
verify.completionListContains("p", '(property) p: number');