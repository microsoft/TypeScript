/// <reference path='fourslash.ts'/>

////class C {
////    name: string;
////    age: number;
////}

////interface I {
////    [x: number]: C;
////}

////var /*1*/x = [null, null];
////var x2: I = [null, null];
////var /*2*/r = x2[0];

////var a = { name: 'bob', age: 20 };
////var b = { name: 'jim', age: 20, dob: new Date() };
////var c: C;
////var d = { name: 'jim', age: 20, address: 'springfield' };

////var x3: I = [a, b];
////var /*3*/r3 = x3[1];

////var x4: I = [a, b, c];
////var /*4*/r4 = x4[1];

////var /*5*/x5 = [a, b];
////var /*6*/r5 = x5[1];

// the above code should have a couple errors that will need to be updated with appropriate new (non-error) code and quick info checks
verify.not.errorExistsBetweenMarkers('1', '6');

verify.quickInfos({
    1: "var x: any[]",
    2: "var r: C",
    3: "var r3: C",
    4: "var r4: C",
    5: "var x5: {\n\
    name: string;\n\
    age: number;\n\
}[]",
    6: "var r5: {\n\
    name: string;\n\
    age: number;\n\
}"
});
