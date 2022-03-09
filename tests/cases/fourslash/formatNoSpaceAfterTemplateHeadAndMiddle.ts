/// <reference path='fourslash.ts' />

////const a1 = `${ 1 }${ 1 }`;
////const a2 = `
////    ${ 1 }${ 1 }
////`;
////const a3 = `
////
////
////    ${ 1 }${ 1 }
////`;
////const a4 = `
////
////    ${ 1 }${ 1 }
////
////`;
////const a5 = `text ${ 1 } text ${ 1 } text`;
////const a6 = `
////    text ${ 1 }
////    text ${ 1 }
////    text
////`;

format.setOption("insertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces", false);
format.document();
verify.currentFileContentIs(
    "const a1 = `${1}${1}`;\n" +

    "const a2 = `\n" +
    "    ${1}${1}\n" +
    "`;\n" +

    "const a3 = `\n" +
    "\n" +
    "\n" +
    "    ${1}${1}\n" +
    "`;\n" +

    "const a4 = `\n" +
    "\n" +
    "    ${1}${1}\n" +
    "\n" +
    "`;\n" +

    "const a5 = `text ${1} text ${1} text`;\n" +

    "const a6 = `\n" +
    "    text ${1}\n" +
    "    text ${1}\n" +
    "    text\n" +
    "`;"
);
