/// <reference path='fourslash.ts' />

//// var name1 = undefined, id1 = undefined;
//// var /*obj1*/obj1 = {/*name1*/name1, /*id1*/id1};
//// var name2 = "Hello";
//// var id2 = 10000;
//// var /*obj2*/obj2 = {/*name2*/name2, /*id2*/id2};

verify.quickInfos({
    obj1: "var obj1: {\n    name1: any;\n    id1: any;\n}",
    name1: "(property) name1: any",
    id1: "(property) id1: any",

    obj2: "var obj2: {\n    name2: string;\n    id2: number;\n}",
    name2: "(property) name2: string",
    id2: "(property) id2: number"
});
