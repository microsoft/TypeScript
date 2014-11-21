/// <reference path='fourslash.ts' />

//// var name1 = undefined, id1 = undefined;
//// var /*obj1*/obj1 = {/*name1*/name1, /*id1*/id1};
//// var name2 = "Hello";
//// var id2 = 10000;
//// var /*obj2*/obj2 = {/*name2*/name2, /*id2*/id2};

goTo.marker("obj1");
verify.quickInfoIs("(var) obj1: {\n    name1: any;\n    id1: any;\n}");
goTo.marker("name1");
verify.quickInfoIs("(property) name1: any");
goTo.marker("id1");
verify.quickInfoIs("(property) id1: any");

goTo.marker("obj2");
verify.quickInfoIs("(var) obj2: {\n    name2: string;\n    id2: number;\n}");
goTo.marker("name2");
verify.quickInfoIs("(property) name2: string");
goTo.marker("id2");
verify.quickInfoIs("(property) id2: number");
