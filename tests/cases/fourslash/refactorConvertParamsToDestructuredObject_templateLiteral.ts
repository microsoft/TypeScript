/// <reference path='fourslash.ts' />

////function /*a*/insert/*b*/(template: string, overwriteBefore = 0) {}
////insert(`
////  <head>
////    <meta charset="UTF-8">
////    <meta http-equiv="X-UA-Compatible" content="\${5:ie=edge}">
////  </head>
////`);


goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert parameters to destructured object",
    actionName: "Convert parameters to destructured object",
    actionDescription: "Convert parameters to destructured object",
    newContent: `function insert(template: string, overwriteBefore = 0) {}
insert({
  template: \`
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="\${5:ie=edge}">
  </head>
\`
});`
});
