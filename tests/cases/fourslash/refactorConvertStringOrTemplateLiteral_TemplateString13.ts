/// <reference path='fourslash.ts' />

////fetch(/*start*/process.env.API_URL + `/foo/bar?id=${id}&token=${token}`/*end*/);

goTo.select("start", "end");
edit.applyRefactor({
    refactorName: "Convert to template string",
    actionName: "Convert to template string",
    actionDescription: ts.Diagnostics.Convert_to_template_string.message,
    newContent: "fetch(`${process.env.API_URL}/foo/bar?id=${id}&token=${token}`);",
});
