/// <reference path='fourslash.ts' />

////function /*a*/buildName/*b*/(firstName: string, middleName?: string, ...restOfName: string[]) { }
////let employeeName = buildName("Joseph", "Samuel", "Lucas", "MacKinzie");
////let myName = buildName("Joseph");

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert parameters to destructured object",
    actionName: "Convert parameters to destructured object",
    actionDescription: "Convert parameters to destructured object",
    newContent: `function buildName({ firstName, middleName, restOfName = [] }: { firstName: string; middleName?: string; restOfName?: string[]; }) { }
let employeeName = buildName({ firstName: "Joseph", middleName: "Samuel", restOfName: ["Lucas", "MacKinzie"] });
let myName = buildName({ firstName: "Joseph" });`
});