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

verify.quickInfos({
    1: "var c: {\n    name: string;\n    age: number;\n}[]",
    2: "var c1: {\n    name: string;\n    age: number;\n}[]",
    3:
`var c2: ({
    name: string;
    age: number;
    address: string;
} | {
    name: string;
    age: number;
    dob: Date;
})[]`,
    4: "var c3: I[]"
});
