/// <reference path='fourslash.ts' />

////function /*a*/insert/*b*/(template: string, overwriteBefore = 0) {}
////insert(`this is \${not} a substitution`);


goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert parameters to destructured object",
    actionName: "Convert parameters to destructured object",
    actionDescription: "Convert parameters to destructured object",
    newContent: [
      'function insert({ template, overwriteBefore = 0 }: { template: string; overwriteBefore?: number; }) {}',
      'insert({ template: `this is \\${not} a substitution` });'
    ].join('\n')
});
