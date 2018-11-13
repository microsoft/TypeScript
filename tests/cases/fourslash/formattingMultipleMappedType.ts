/// <reference path='fourslash.ts' />

/////*x1*/type x1<T> = {[K in keyof T]: number}
/////*x2*/type x2<T> = { [K in keyof T]: number }
/////*x3*/type x3<T> = { [K in keyof T]: number}
/////*x4*/type x4<T> = {[K in keyof T]: number }
/////*x5*/type x5<T> = {    [K in keyof T]: number}
/////*x6*/type x6<T> = {[K in keyof T]: number    }
/////*x7*/type x7<T> = {    [K in keyof T]: number     }
/////*x8*/type x8<T> = {    [K in keyof T]: number     };
////
/////*y1*/type y1 = {foo: number}
/////*y2*/type y2 = { foo: number }
/////*y3*/type y3 = { foo: number}
/////*y4*/type y4 = {foo: number }
/////*y5*/type y5 = {    foo: number}
/////*y6*/type y6 = {foo: number   }
/////*y7*/type y7 = {   foo: number   }
/////*y8*/type y8 = {   foo: number   };

format.document();
for (let index = 1; index < 8; index++) {
    goTo.marker(`x${index}`);
    verify.currentLineContentIs(`type x${index}<T> = { [K in keyof T]: number }`);   
}

goTo.marker(`x8`);
verify.currentLineContentIs(`type x8<T> = { [K in keyof T]: number };`);   

for (let index = 1; index < 8; index++) {
    goTo.marker(`y${index}`);
    verify.currentLineContentIs(`type y${index} = { foo: number }`);   
}

goTo.marker(`y8`);
verify.currentLineContentIs(`type y8 = { foo: number };`);  