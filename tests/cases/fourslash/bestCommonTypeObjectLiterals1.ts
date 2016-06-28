/// <reference path='fourslash.ts'/>

////var a = { name: 'bob', age: 18 };
////var b = { name: 'jim', age: 20 };
////var /*1*/c = [a, b];

////var a1 = { name: 'bob', age: 18 };
////var b1 = { name: 'jim', age: 20, dob: new Date() };
////var /*2*/c1 = [a1, b1];

////var a2 = { name: 'bob', age: 18, address: 'springfield' };
////var b2 = { name: 'jim', age: 20, dob: new Date() };
////var /*3*/c2 = [a2, b2];

////interface I {
////    name: string;
////    age: number;
////}

////var i: I;
////var /*4*/c3 = [i, a];

goTo.marker('1');
verify.quickInfoIs('var c: {\n    name: string;\n    age: number;\n}[]');

goTo.marker('2');
verify.quickInfoIs('var c1: {\n    name: string;\n    age: number;\n}[]');

goTo.marker('3');
verify.quickInfoIs('var c2: ({\n\
    name: string;\n\
    age: number;\n\
    address: string;\n\
} | {\n\
    name: string;\n\
    age: number;\n\
    dob: Date;\n\
})[]');

goTo.marker('4');
verify.quickInfoIs('var c3: I[]');

