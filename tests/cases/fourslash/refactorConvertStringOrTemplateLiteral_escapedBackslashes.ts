/// <reference path='fourslash.ts' />

//// console.log(/*0*/"\\[[" + text + "](" + link + ")\\]"/*1*/)

goTo.select("0", "1");
edit.applyRefactor({
    refactorName: "Convert to template string",
    actionName: "Convert to template string",
    actionDescription: ts.Diagnostics.Convert_to_template_string.message,
    // Four backslashes here
    //   = two backslashes in the expected file content
    //   = one backslash in the string data sent to console.log
    //     (which is the same as what the user started with)
    newContent: 'console.log(`\\\\[[${text}](${link})\\\\]`)',
});
